const vendorDescriptionModel = require("../modal/vendorDescriptionModal");
const vendorStockModel = require("../modal/vendorStockModel");

const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

const uploadExl = async (req, res) => {
  var uploadBy = {email:req.body.email,role:req.body.role};
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

      // console.log(path)

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let tutorials = [];

      // console.log("rows ====== ", rows)

      rows.forEach((row) => {
        let tutorial = { 
vendor:row[0],
collection:row[1],
item_code:row[2],
description:row[3],
category_ID:row[4],
composition:row[5],
dimensions:row[6],
images:row[7]

        };

        tutorials.push(tutorial);
      });
 
var csvValue1 = tutorials.map((o) => {
 

     const split_string = o.images.split(",") 
     
    return(
 Object.assign({}, tutorials,uploadBy, { 
 images: split_string,
 name:o.description,
 vendor: o.vendor,
 item_code:o.item_code,
 description:o.description,
 collectionn:o.collection,
 catId:o.category_ID,
 composition:o.composition,
 dimensions:o.dimensions,
 email:req.body.email,
 role:req.body.role

 })
    );
 });
 //New Added....  BY R4H
  var csvValue2 = tutorials.map((o) => {

     const split_string = o.images.split(",") 
    return(
 Object.assign({}, tutorials,uploadBy, { 
 pic: split_string, 
 vendor: o.vendor,
 item_code:o.item_code, 
 email:req.body.email,
 role:req.body.role

 })
    );
 });



vendorStockModel.insertMany(csvValue2,(err,data)=>{  
if(err){  
console.log(err);  
}
});

//FINISHED

vendorDescriptionModel.insertMany(csvValue1,(err,data)=>{  
if(err){  
console.log(err);  
}
return res.status(200).json(data)
}); 

      // Tutorial.bulkCreate(tutorials)
      //   .then(() => {
      //     res.status(200).send({
      //       message: "Uploaded the file successfully: " + req.file.originalname,
      //     });
      //   })
      //   .catch((error) => {
      //     res.status(500).send({
      //       message: "Fail to import data into database!",
      //       error: error.message,
      //     });
      //   });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getTutorials = (req, res) => {
  Tutorial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const download = (req, res) => {
  Tutorial.findAll().then((objs) => {
    let tutorials = [];

    objs.forEach((obj) => {
      tutorials.push({
        id: obj.id,
        title: obj.title,
        description: obj.description,
        published: obj.published,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Title", key: "title", width: 25 },
      { header: "Description", key: "description", width: 25 },
      { header: "Published", key: "published", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(tutorials);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tutorials.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

module.exports = {
  uploadExl,
  getTutorials,
  download,
};
