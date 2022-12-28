const AdminImageModel = require("../modal/vendorImageModel");

exports.adminmultiimage = async (req, res) => {
    const { adminEmail } = req.body
    const reqFiles = [];

    // const url = req.protocol + '://' + req.get('host')
    // const url = "https" + '://' + req.get('host')
    const url = "http" + '://' + req.get('host')
    console.log(url)

    for (var i = 0; i < req.files.length; i++) {
        console.log(req.files[i].filename)
        reqFiles.push(url + '/adminImages/' + req.files[i].filename)
    }

    try {
        const imageModalData = await AdminImageModel.create({
            adminEmail,
            vendorImage: reqFiles
        })
    
        res.status(200).json({ resp: imageModalData });
    } catch (err) {
        return res.json({ err });
    }
}


exports.getAdminImagesById = (req, res) => {
    const { email } = req.body;

    AdminImageModel.find({ adminEmail: email }).exec((err, data) => {
        if (err) { return res.status(201).json(err) }
        if (data) { return res.status(200).json(data) }
    })
}