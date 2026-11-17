import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiUpload, FiTrash2, FiCopy, FiCheck, FiExternalLink, FiFileText, FiImage, FiAlertCircle } from 'react-icons/fi';
import { api, MAX_UPLOAD_MB } from './api';

const formatSize = (bytes) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' });
  } catch {
    return '';
  }
};

// Lists uploaded files, with upload / copy link / delete.
// `findUsage(url)` returns where the current draft uses a file (to warn before deleting).
const FilesPanel = ({ findUsage }) => {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState('');
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const res = await api.listFiles();
      setFiles(res.files);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const upload = async (list) => {
    if (!list?.length) return;
    setBusy(true);
    setError('');
    try {
      for (const file of list) {
        // Sequential keeps each request under the size limit.
        // eslint-disable-next-line no-await-in-loop
        await api.upload(file);
      }
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const remove = async (file) => {
    const usage = findUsage(file.url);
    const warning = usage.length
      ? `"${file.name}" is used in: ${usage.join(', ')}.\nThose links will break unless you change them. Delete anyway?`
      : `Delete "${file.name}"? This cannot be undone.`;
    if (!window.confirm(warning)) return;
    try {
      await api.deleteFile(file.key);
      setFiles((fs) => fs.filter((f) => f.key !== file.key));
    } catch (err) {
      setError(err.message);
    }
  };

  const copy = async (file) => {
    try {
      await navigator.clipboard.writeText(file.url);
    } catch {
      window.prompt('Copy this link:', file.url);
    }
    setCopied(file.key);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 p-5">
        <p className="text-sm text-slate-400">
          PDF, JPG, PNG or WebP · up to {MAX_UPLOAD_MB} MB each. After uploading, copy a file's link into any link field,
          or use the Upload button next to that field directly.
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-400 disabled:opacity-60"
        >
          <FiUpload size={15} /> {busy ? 'Uploading…' : 'Upload files'}
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="application/pdf,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => upload([...(e.target.files || [])])}
        />
      </div>

      {error && (
        <p role="alert" className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" /> {error}
        </p>
      )}

      {files === null && !error && <p className="text-sm text-slate-500">Loading files…</p>}
      {files?.length === 0 && (
        <p className="rounded-xl border border-white/[.08] p-8 text-center text-sm text-slate-500">No files uploaded yet.</p>
      )}

      {files?.length > 0 && (
        <ul className="divide-y divide-white/[.06] overflow-hidden rounded-xl border border-white/[.08]">
          {files.map((file) => {
            const usage = findUsage(file.url);
            const isImage = file.contentType.startsWith('image/');
            return (
              <li key={file.key} className="flex items-center gap-3 bg-white/[.02] px-3 py-3 sm:px-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/[.05] text-slate-400">
                  {isImage ? <img src={file.url} alt="" className="h-full w-full object-cover" loading="lazy" /> : <FiFileText size={18} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{file.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {isImage ? <FiImage className="mr-1 inline" size={11} /> : null}
                    {formatSize(file.size)} · {formatDate(file.uploadedAt)}
                    {usage.length > 0 ? <span className="text-teal-400"> · Used in {usage.join(', ')}</span> : ' · Not used'}
                  </p>
                </div>
                <a href={file.url} target="_blank" rel="noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[.06] hover:text-white" aria-label="Open">
                  <FiExternalLink size={15} />
                </a>
                <button type="button" onClick={() => copy(file)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[.06] hover:text-white" aria-label="Copy link">
                  {copied === file.key ? <FiCheck size={15} className="text-teal-400" /> : <FiCopy size={15} />}
                </button>
                <button type="button" onClick={() => remove(file)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[.06] hover:text-red-400" aria-label="Delete">
                  <FiTrash2 size={15} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilesPanel;
