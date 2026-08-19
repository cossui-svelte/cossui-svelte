import { isHTMLElement, srOnlyStylesString } from 'svelte-toolbelt';
import { isBrowser } from './is';

type AnnouncementKind = 'assertive' | 'polite';

/**
 * Creates or gets an announcer element used to announce messages to screen readers.
 */
function initAnnouncer(doc: Document | null) {
  if (!isBrowser || !doc) return null;
  let el = doc.querySelector('[data-bits-announcer]');

  const createLog = (kind: AnnouncementKind) => {
    const log = doc.createElement('div');
    log.role = 'log';
    log.ariaLive = kind;
    log.setAttribute('aria-relevant', 'additions');
    return log;
  };

  if (!isHTMLElement(el)) {
    const div = doc.createElement('div');
    div.style.cssText = srOnlyStylesString;
    div.setAttribute('data-bits-announcer', '');
    div.appendChild(createLog('assertive'));
    div.appendChild(createLog('polite'));
    el = div;
    doc.body.insertBefore(el, doc.body.firstChild);
  }

  const getLog = (kind: AnnouncementKind) => {
    if (!isHTMLElement(el)) return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log)) return null;
    return log;
  };

  return { getLog };
}

/**
 * Creates an announcer object used to make `aria-live` announcements to screen readers.
 */
export function getAnnouncer(doc: Document | null) {
  const announcer = initAnnouncer(doc);

  function announce(
    value: string | number | null,
    kind: AnnouncementKind = 'assertive',
    timeout = 7500
  ) {
    if (!announcer || !isBrowser || !doc) return;
    const log = announcer.getLog(kind);
    const content = doc.createElement('div');
    let text: string;
    if (typeof value === 'number') {
      text = value.toString();
    } else if (value === null) {
      text = 'Empty';
    } else {
      text = value.trim();
    }
    content.innerText = text;
    if (kind === 'assertive') {
      log?.replaceChildren(content);
    } else {
      log?.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }

  return { announce };
}
