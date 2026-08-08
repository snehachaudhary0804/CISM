const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateNOC = async ({ internship, noc }) => {
  const folder = path.join(__dirname, "../uploads/noc");

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const fileName = `${noc.nocNumber}.pdf`;
  const filePath = path.join(folder, fileName);

  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  // Header
  doc.fontSize(20).text("IMS Engineering College", {
    align: "center",
  });

  doc.fontSize(13).text("Internship No Objection Certificate", {
    align: "center",
  });

  doc.moveDown(2);

  doc.fontSize(11);

  doc.text(`NOC Number : ${noc.nocNumber}`);
  doc.text(`Issue Date : ${new Date(noc.issueDate).toLocaleDateString()}`);
  doc.text(`Valid Till : ${new Date(noc.validTill).toLocaleDateString()}`);

  doc.moveDown();

  doc.text(`Student : ${internship.student.name}`);
  doc.text(`Roll No : ${internship.student.rollNumber}`);
  doc.text(`Department : ${internship.department.departmentName}`);

  doc.moveDown();

  doc.text(`Company : ${internship.externalDetails.companyName}`);

  doc.text(`Domain : ${internship.domain.domainName}`);

  doc.text(`Internship Type : ${internship.internshipType}`);

  doc.moveDown(2);

  doc.text(
    `This is to certify that the above student is permitted to undergo internship in the above organization.`,
  );

  doc.moveDown(4);

  doc.text(`Remarks : ${noc.remarks || "-"}`);

  doc.moveDown(4);

  doc.text(`HOD`, 70, doc.y);

  doc.text(noc.hodName, 70, doc.y + 15);

  doc.text(`Principal`, 420, doc.y - 15);

  doc.end();

  return new Promise((resolve) => {
    stream.on("finish", () => {
      resolve({
        filePath,
        fileName,
      });
    });
  });
};

module.exports = generateNOC;
