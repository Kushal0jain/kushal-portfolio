import React, { useState } from 'react';
import { FiExternalLink, FiLogOut, FiRotateCcw, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import SectionEditor, { AddButton, ObjectEditor } from './SectionEditor';
import FilesPanel from './FilesPanel';
import { SECTIONS, blankItem, MAX_ITEMS } from './sections';

export const FILES_TAB = 'files';

const formatTime = (iso) => {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
};

const Dashboard = ({
  email, draft, setSection, newId, dirty, saving, message, onSave, onDiscard, onResetDefaults, onLogout,
  updatedAt, tab, setTab, openId, setOpenId, findUsage,
}) => {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const isFiles = tab === FILES_TAB;
  const cfg = isFiles
    ? { label: 'Files', description: 'Photos, resume and certificate files used on the site. Uploads are saved straight away — no need to click Save.' }
    : SECTIONS[tab];
  const isObject = cfg.kind === 'object';

  const addItem = () => {
    const item = { ...blankItem(tab), _id: newId() };
    setSection(tab, [...draft[tab], item]);
    setOpenId(item._id);
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/[.06] bg-[#070b14]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white">Portfolio admin</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/[.06] hover:text-white"
          >
            <FiExternalLink size={15} /> <span className="hidden sm:inline">View site</span>
          </a>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/[.06] hover:text-white"
          >
            <FiLogOut size={15} /> <span className="hidden sm:inline">Log out</span>
          </button>
        </div>

        {/* Section tabs */}
        <nav className="mx-auto flex max-w-5xl flex-wrap gap-x-1 px-4 sm:px-6" aria-label="Sections">
          {Object.entries(SECTIONS).map(([key, s]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                tab === key ? 'border-teal-400 text-white' : 'border-transparent text-slate-400 hover:text-white'
              }`}
              aria-current={tab === key ? 'page' : undefined}
            >
              {s.label}
              {s.kind !== 'object' && (
                <span className="ml-1.5 rounded-full bg-white/[.06] px-1.5 py-0.5 text-[11px] text-slate-400">{draft[key].length}</span>
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setTab(FILES_TAB)}
            className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
              isFiles ? 'border-teal-400 text-white' : 'border-transparent text-slate-400 hover:text-white'
            }`}
            aria-current={isFiles ? 'page' : undefined}
          >
            Files
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">{cfg.label}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {cfg.description ? `${cfg.description} ` : ''}
              {!isFiles && !isObject && 'Use the arrows to change the display order.'}
            </p>
          </div>
          {!isFiles && !isObject && (
            <AddButton sectionKey={tab} onAdd={addItem} disabled={draft[tab].length >= MAX_ITEMS} />
          )}
        </div>

        {isFiles ? (
          <FilesPanel findUsage={findUsage} />
        ) : isObject ? (
          <ObjectEditor sectionKey={tab} value={draft[tab]} onChange={(v) => setSection(tab, v)} />
        ) : (
          <SectionEditor
            sectionKey={tab}
            items={draft[tab]}
            onChange={(items) => setSection(tab, items)}
            openId={openId}
            setOpenId={setOpenId}
          />
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[.06] pt-6 text-xs text-slate-500">
          <span>{updatedAt ? `Last saved ${formatTime(updatedAt)}` : 'Showing the built-in content (never saved from the admin panel).'}</span>
          {confirmingReset ? (
            <span className="flex items-center gap-2">
              Replace every section with the built-in content?
              <button type="button" className="font-semibold text-red-400 hover:underline" onClick={() => { onResetDefaults(); setConfirmingReset(false); }}>
                Yes, reset
              </button>
              <button type="button" className="hover:underline" onClick={() => setConfirmingReset(false)}>
                Cancel
              </button>
            </span>
          ) : (
            <button type="button" className="inline-flex items-center gap-1.5 hover:text-slate-300" onClick={() => setConfirmingReset(true)}>
              <FiRotateCcw size={13} /> Reset all sections to built-in content
            </button>
          )}
        </div>
      </main>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[.08] bg-[#0b111d]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1 text-sm" role="status" aria-live="polite">
            {message ? (
              <span className={`flex items-start gap-2 ${message.type === 'error' ? 'text-red-300' : 'text-teal-300'}`}>
                {message.type === 'error' ? <FiAlertCircle className="mt-0.5 flex-shrink-0" /> : <FiCheckCircle className="mt-0.5 flex-shrink-0" />}
                {message.text}
              </span>
            ) : dirty ? (
              <span className="text-amber-300">You have unsaved changes.</span>
            ) : (
              <span className="text-slate-500">All changes saved.</span>
            )}
          </div>
          <button
            type="button"
            onClick={onDiscard}
            disabled={!dirty || saving}
            className="rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/[.06] disabled:opacity-40"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!dirty || saving}
            className="rounded-lg bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-400 disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
