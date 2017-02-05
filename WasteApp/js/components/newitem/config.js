export default {
  license: 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiXSwidmFsaWQiOiIyMDE4LTAyLTA0IiwibWFqb3JWZXJzaW9uIjoiMyIsImlzQ29tbWVyY2lhbCI6ZmFsc2UsInRvbGVyYW5jZURheXMiOjYwLCJpb3NJZGVudGlmaWVyIjpbImNvbS53YXN0ZWxlc3MiXSwiYW5kcm9pZElkZW50aWZpZXIiOlsiY29tLndhc3RlbGVzcyJdLCJ3aW5kb3dzSWRlbnRpZmllciI6WyJjb20ud2FzdGVsZXNzIl19Cm5YYVdlYnVBd1diZmkvRFlSUEU2WHhncTdsMlFrTW5DS2VlSmk1bFNCZDg3cDFNR0NVNk8xaS9SdStXM2h5bUpobjdoSkRkSjE4RHBuVUp6bEpYeVBReXFWWitSQ1ZnS2JjZjIxQzdtL1pYWnpJTnJRYWhVOTdZNFNGM08rN0Z0Z2FKOFNnQjNHQnhUTUYzM1BaNGF4Vk5oWjVScHRXL291a3d1MHVIdnhJT2VoUlBaTnRvOE5BNS9qcUwzclVjVjUzRmhtVm1PelZxdTNSVGN4VlJaRTYzanBpN0V3OHA5ZThKRHhmamd3Rkl1NG9FQkw1Q1gzQk41STVrNkdNdEhSeDRpUmorRUVJRmRMcEo3TWlaTlRxcWdwckZSUTdxM3NzemhSRDZaYWlpZjE4OW9xNzROMnJ0eUo5dlBUTW10blN2L0g2YXc3WDl5L0lySHpLY1pnUT09',
 
 
  options: {
  "captureResolution":"1080",
  "cutout": {
    "style": "rect",
    "maxWidthPercent": "80%",
    "maxHeightPercent": "80%",
    "alignment": "center",
    "width": 540,
    "ratioFromSize": {
      "width": 5,
      "height": 1
    },
    "strokeWidth": 2,
    "cornerRadius": 10,
    "strokeColor": "FFFFFF",
    "outerColor": "000000",
    "outerAlpha": 0.3
  },
  "flash": {
    "mode": "manual",
    "alignment": "bottom_right"
  },
  "beepOnResult": true,
  "vibrateOnResult": true,
  "blinkAnimationOnResult": true,
  "cancelOnResult": true,
  "visualFeedback": {
    "style": "contour_underline",
    "strokeWidth": 3,
    "strokeColor": "0099FF"
  }
},
  ocr: {
        "scanMode": "GRID",
        "minCharHeight": 16,
        "maxCharHeight": 85,
        "traineddataFiles": ["tessdata/eng_no_dict.traineddata"],
        "charWhitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        "validationRegex": "^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[012])\.\d{2}$",
        "minConfidence": 85,
        "removeSmallContours": true,
        "charCountX": 8,
        "charCountY": 1,
        "charPaddingXFactor": 0.5,
        "isBrightTextOnDark": true
    }
}