const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    console.log("Extension:", ext)

    let baseName = path.basename(file.originalname, ext)
    console.log("BaseName:", baseName)

    // assign replaced string back to variable
    const  cleanName = baseName
                    .replace(/\s+/g, "-")
                    .replace(/\(+\d+\)+/g, "")
    console.log("CleanName:", cleanName)

    cb(null, `${Date.now()}-${cleanName}${ext}`)
  }
})

const upload = multer({ storage })

module.exports = upload
