import React, { useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiArrowUp, FiArrowDown, FiTrash2, FiPlus, FiUpload, FiExternalLink } from 'react-icons/fi';
import { SECTIONS } from './sections';
import { SKILL_ICONS, renderSkillIcon } from '../content/skillIcons';
import { api } from './api';
import { ACCENTS } from '../content/accents';

const inputCls =
  'w-full rounded-lg border border-white/10 bg-white/[.04] px-3 py-2.5 text-sm text-white outline-none ' +
  'placeholder:text-white/30 focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20 transition';

const iconBtn =
  'inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[.06] hover:text-white ' +
  'disabled:opacity-30 disabled:pointer-events-none transition';

// Link input with an optional "Upload" button that stores the file and fills in its URL.
const LinkInput = ({ id, field, value, onChange }) => {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const res = await api.upload(file);
      onChange(res.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          id={id}
          type="text"
          inputMode="url"
          className={inputCls}
          value={value || ''}
          maxLength={field.max}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && /^(https?:\/\/|\/)/.test(value) && (
          <a href={value} target="_blank" rel="noreferrer" className={`${iconBtn} h-auto w-10 flex-shrink-0 border border-white/10`} aria-label="Open link">
            <FiExternalLink size={15} />
          </a>
        )}
        {field.upload && (
          <>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-sm text-slate-300 hover:bg-white/[.06] hover:text-white disabled:opacity-50"
            >
              <FiUpload size={14} /> {busy ? 'Uploading…' : 'Upload'}
            </button>
            <input ref={fileRef} type="file" accept={field.upload} className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
          </>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </>
  );
};

export const Field = ({ field, value, onChange, id }) => {
  if (field.type === 'toggle') {
    const on = value !== false;
    return (
      <div className="md:col-span-2">
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => onChange(!on)}
          className="flex items-center gap-3 text-sm text-white"
        >
          <span className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${on ? 'bg-teal-500' : 'bg-white/15'}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${on ? 'left-[22px]' : 'left-0.5'}`} />
          </span>
          {field.label}
          {!on && <span className="text-xs text-slate-500">(hidden on the site)</span>}
        </button>
      </div>
    );
  }

  const label = (
    <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
      {field.label}
      {field.required && <span className="ml-1 text-teal-400">*</span>}
    </label>
  );
  const hint = field.hint && <p className="mt-1.5 text-xs text-slate-500">{field.hint}</p>;
  const wide = field.type === 'lines' || field.wide || field.type === 'link';

  let control;
  if (field.type === 'lines') {
    control = (
      <textarea
        id={id}
        className={`${inputCls} min-h-[120px] resize-y leading-relaxed`}
        value={(value || []).join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
        rows={field.rows || Math.min(10, Math.max(4, (value || []).length + 1))}
      />
    );
  } else if (field.type === 'textarea') {
    control = (
      <textarea
        id={id}
        className={`${inputCls} resize-y leading-relaxed`}
        value={value || ''}
        maxLength={field.max}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (field.type === 'icon') {
    control = (
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[.04] text-2xl [&_svg]:max-h-7 [&_svg]:max-w-7">
          {renderSkillIcon(value)}
        </div>
        <select id={id} className={inputCls} value={value || 'code'} onChange={(e) => onChange(e.target.value)}>
          {Object.entries(SKILL_ICONS).map(([key, { label: name }]) => (
            <option key={key} value={key} className="bg-slate-900">{name}</option>
          ))}
        </select>
      </div>
    );
  } else if (field.type === 'select') {
    const select = (
      <select id={id} className={inputCls} value={value || field.options[0].value} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => (
          <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
        ))}
      </select>
    );
    control = field.swatch ? (
      <div className="flex items-center gap-3">
        <span
          className="h-10 w-10 flex-shrink-0 rounded-lg border border-white/10"
          style={{ background: `rgb(${(ACCENTS[value] || ACCENTS.teal)[500]})` }}
          aria-hidden="true"
        />
        {select}
      </div>
    ) : select;
  } else if (field.type === 'link') {
    control = <LinkInput id={id} field={field} value={value} onChange={onChange} />;
  } else {
    control = (
      <input
        id={id}
        type={field.type === 'email' ? 'email' : 'text'}
        inputMode={field.type === 'digits' ? 'numeric' : undefined}
        className={inputCls}
        value={value || ''}
        maxLength={field.type === 'digits' ? 20 : field.max}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div className={wide ? 'md:col-span-2' : ''}>
      {label}
      {control}
      {hint}
    </div>
  );
};

const optionLabel = (field, value) => field?.options?.find((o) => o.value === value)?.label || value;

// Editor for a single-object section (the profile), grouped into cards.
export const ObjectEditor = ({ sectionKey, value, onChange }) => {
  const cfg = SECTIONS[sectionKey];
  return (
    <div className="space-y-5">
      {cfg.groups.map((group) => (
        <fieldset key={group.title} className="rounded-xl border border-white/[.08] bg-white/[.02] p-4 sm:p-5">
          <legend className="px-1 text-sm font-semibold text-white">{group.title}</legend>
          <div className="grid gap-4 md:grid-cols-2">
            {group.fields.map((field) => (
              <Field
                key={field.key}
                id={`${sectionKey}-${field.key}`}
                field={field}
                value={value[field.key]}
                onChange={(v) => onChange({ ...value, [field.key]: v })}
              />
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

const SectionEditor = ({ sectionKey, items, onChange, openId, setOpenId }) => {
  const cfg = SECTIONS[sectionKey];
  const titleField = cfg.fields.find((f) => f.key === cfg.titleField);

  const update = (index, key, value) =>
    onChange(items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  const move = (index, delta) => {
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(index + delta, 0, moved);
    onChange(next);
  };

  const remove = (index) => {
    const name = optionLabel(titleField, items[index][cfg.titleField]) || `this ${cfg.singular}`;
    if (window.confirm(`Delete "${name}"? This takes effect when you save.`)) {
      onChange(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
          No {cfg.label.toLowerCase()} yet. This part of the site will be hidden or empty.
        </p>
      )}

      {items.map((item, index) => {
        const open = openId === item._id;
        const titleValue = optionLabel(titleField, item[cfg.titleField]);
        const title = titleValue || <span className="italic text-slate-500">Untitled {cfg.singular}</span>;
        const subtitle = item[cfg.subtitleField];
        return (
          <div
            key={item._id}
            className={`rounded-xl border transition ${open ? 'border-teal-500/40 bg-white/[.04]' : 'border-white/[.08] bg-white/[.02]'}`}
          >
            <div className="flex items-center gap-2 py-2 pl-2 pr-2 sm:pl-4">
              {sectionKey === 'skills' && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden text-xl [&_svg]:max-h-6 [&_svg]:max-w-6">
                  {renderSkillIcon(item.icon)}
                </div>
              )}
              <button
                type="button"
                className="min-w-0 flex-1 py-1.5 text-left"
                onClick={() => setOpenId(open ? null : item._id)}
                aria-expanded={open}
              >
                <span className="block truncate text-sm font-semibold text-white">{title}</span>
                {subtitle && <span className="block truncate text-xs text-slate-500">{subtitle}</span>}
              </button>
              <button type="button" className={iconBtn} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
                <FiArrowUp size={15} />
              </button>
              <button type="button" className={iconBtn} onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down">
                <FiArrowDown size={15} />
              </button>
              <button type="button" className={`${iconBtn} hover:!text-red-400`} onClick={() => remove(index)} aria-label="Delete">
                <FiTrash2 size={15} />
              </button>
              <button type="button" className={iconBtn} onClick={() => setOpenId(open ? null : item._id)} aria-label={open ? 'Collapse' : 'Expand'}>
                {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </button>
            </div>

            {open && (
              <div className="grid gap-4 border-t border-white/[.06] p-4 sm:p-5 md:grid-cols-2">
                {cfg.fields.map((field) => (
                  <Field
                    key={field.key}
                    id={`${item._id}-${field.key}`}
                    field={field}
                    value={item[field.key]}
                    onChange={(v) => update(index, field.key, v)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const AddButton = ({ sectionKey, onAdd, disabled }) => (
  <button
    type="button"
    onClick={onAdd}
    disabled={disabled}
    title={disabled ? 'Limit reached' : undefined}
    className="inline-flex items-center gap-2 rounded-lg border border-teal-500/40 px-4 py-2 text-sm font-semibold text-teal-400 transition hover:bg-teal-500/10 disabled:pointer-events-none disabled:opacity-40"
  >
    <FiPlus size={16} /> Add {SECTIONS[sectionKey].singular}
  </button>
);

export default SectionEditor;
