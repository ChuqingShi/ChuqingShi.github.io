import QRCode from 'qrcode'

// Turns a URL into the SVG drawing instructions for a QR code.
//
// The `qrcode` library does the hard part (error-correcting encoding) and
// gives back a square grid of dark/light "modules". This function converts
// that grid into one SVG <path>: for every dark module, "move to (x, y),
// draw a 1×1 square". React then renders the path like any other element,
// so the QR code is generated from `profile.linkedinUrl` and can never drift
// out of sync with the link next to it.

/** Blank modules around the code; scanners need this "quiet zone". */
export const QUIET_ZONE = 4

export type QrDrawing = {
  /** Width and height of the drawing, in modules, including the quiet zone. */
  viewBoxSize: number
  /** SVG path data covering every dark module. */
  path: string
}

export function buildQrDrawing(text: string): QrDrawing {
  // Error-correction level M recovers from ~15% damage: a good default for
  // a code people scan off a screen.
  const { modules } = QRCode.create(text, { errorCorrectionLevel: 'M' })
  const commands: string[] = []
  for (let row = 0; row < modules.size; row++) {
    for (let col = 0; col < modules.size; col++) {
      if (modules.get(row, col)) {
        commands.push(`M${col + QUIET_ZONE} ${row + QUIET_ZONE}h1v1h-1z`)
      }
    }
  }
  return { viewBoxSize: modules.size + QUIET_ZONE * 2, path: commands.join('') }
}
