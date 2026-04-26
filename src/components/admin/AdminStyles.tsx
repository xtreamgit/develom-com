/**
 * AdminStyles — injected as admin.components.header[0] so it applies globally
 * to every admin page.
 *
 * Root problem: Payload's StepNav wraps the custom Icon in:
 *   <div class="step-nav__home">
 *     <span title="…">   ← .step-nav span { overflow: hidden; max-width: 160px }
 *       <Icon />           ← our 50×50 SVG gets clipped here
 *     </span>
 *   </div>
 *
 * These overrides expand the container and clear the overflow clip so the
 * 50×50 gradient logo is fully visible in the app header.
 */
const ADMIN_OVERRIDES = `
  /* Expand the home button container to fit the 50×50 icon */
  .step-nav__home,
  .step-nav .step-nav__home {
    width: 50px !important;
    height: 50px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
  }

  /* The <span> Payload injects around the Icon has overflow:hidden — remove it */
  .step-nav__home > span,
  .step-nav .step-nav__home > span {
    overflow: visible !important;
    max-width: none !important;
    white-space: normal !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
`

export default function AdminStyles() {
  // eslint-disable-next-line react/no-danger
  return <style dangerouslySetInnerHTML={{ __html: ADMIN_OVERRIDES }} />
}
