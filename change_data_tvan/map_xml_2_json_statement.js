const xml_input = `<TBao><DLTBao Id="Id-db6de1520a9c42fca73d94c50b4aedfe"><PBan>2.0.0</PBan><MSo>01/TB-ĐKĐT</MSo><Ten>Thông báo về việc chấp nhận đăng ký sử dụng hóa đơn điện tử</Ten><DDanh>Hải Phòng</DDanh><TCQTCTren>Cục thuế Thành phố Hải phòng</TCQTCTren><TCQT>Chi cục Thuế khu vực Hồng Bàng - An Dương</TCQT><MST>0202019860</MST><TNNT>CÔNG TY TNHH GIAO NHẬN VẬN TẢI HÀO HƯNG</TNNT><Ngay>2021-12-31T07:00:00</Ngay><HTDKy>1</HTDKy><TTXNCQT>1</TTXNCQT><HThuc>KT. Chi Cục Trưởng</HThuc><CDanh>Phó Chi Cục Trưởng</CDanh></DLTBao><STBao Id="Id-502dc02159354f3593f1f194235cf8de"><So>14TB-CCTKV</So><NTBao>2022-01-04T08:34:22</NTBao></STBao><DSCKS><TTCQT><Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="TTCQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><Reference URI="#Object-TTCQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>tfom5H+LSjM0eaSpwwHC+r/wnuAALidPAR0ancRo0QM=</DigestValue></Reference><Reference URI="#Id-db6de1520a9c42fca73d94c50b4aedfe"><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>FUJenSx48E5e1vM9U3JsPDURr/UUXd8x83NKlhj7S8Y=</DigestValue></Reference></SignedInfo><SignatureValue>wceXzxVIHtD/obv12vI15uJdAP5HUuxVFEC+w0CwOK8kWJKKpHjLmGCzabejNID2KZtL3P2FwzU9lK8XBdY29qRwU52qukIBGD+28qgA1VVYio4eg2jh/9qRNB/9e26D9P3J4w53QRUt9iHIAU2Y7STERFuEeqiFsw7mZkkDNsmO8dX74lXGIlKI5PWUzmwA2ZO3J6hg5znqlgOqnDh3/Zsw1plcfuk70qGfVFkKuw7JPV6BxA8nj/OUA04bzHdrMdB91VXaPeDSgH7fyc+WTne0N73sfQyjdu7vqvtSg9N1LdZdkd7C25PZtIkjnCE19i++8dDS+VMR2+9r7V4zHg==</SignatureValue><KeyInfo><X509Data><X509SubjectName>CN=Phó Chi cục Trưởng Phạm Thanh Hải, L=Hải Phòng, OU=Cục Thuế thành phố Hải Phòng, OU=Tổng cục Thuế, O=Bộ Tài chính, C=VN</X509SubjectName><X509Certificate>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</X509Certificate></X509Data></KeyInfo><Object Id="Object-TTCQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><SignatureProperties xmlns=""><SignatureProperty Id="SignatureProperty-TTCQT-Id-db6de1520a9c42fca73d94c50b4aedfe" Target="#TTCQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><SigningTime>2022-01-04T08:26:34</SigningTime></SignatureProperty></SignatureProperties></Object></Signature></TTCQT><CQT><Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="CQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><Reference URI="#Object-CQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>lDXikDFijlSXPy+5loDuRiJ0rwrcMk7ESqJG9fypms4=</DigestValue></Reference><Reference URI="#Id-db6de1520a9c42fca73d94c50b4aedfe"><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>FUJenSx48E5e1vM9U3JsPDURr/UUXd8x83NKlhj7S8Y=</DigestValue></Reference><Reference URI="#Id-502dc02159354f3593f1f194235cf8de"><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>XxJOfY0iCIXnnB5wWBohpbkF+QKvnCzF2UCsj0oEaqk=</DigestValue></Reference></SignedInfo><SignatureValue>o2Hu00GZFSJwb9TpOiBhxjpd5bkHgLvdLwvF869fdDpGJNq+auwHnMWMpwgYY9MiaZDTAwKXVbaVYFP2xpLowoBcDOVyPC/DpODPiRAboGkRacCauoJS0SLF4AyhNcCWjU8XESvJhg7GsxtUYEQIG8uDareQxUy+cVRJ//2etYOBnDmrn5oY3b3AkPrK9u1VNjiZOSng6C/P7cMbWF0dSa+5u1wFhWZXpdB8sMjt24icYb0dy+VHm/Q6Fe1xf6KB8VrcGCs4SosQNWn9uWXgPKMBzQYoKo+9h7dl0PZNVjrGzt4YZtbHWoZsOZdTEv2ORoGSI2ygLOL7maqkxKlUlA==</SignatureValue><KeyInfo><X509Data><X509SubjectName>CN=Chi cục Thuế khu vực Hồng Bàng - An Dương, L=Hải Phòng, OU=Cục Thuế thành phố Hải Phòng, OU=Tổng cục Thuế, O=Bộ Tài chính, C=VN</X509SubjectName><X509Certificate>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</X509Certificate></X509Data></KeyInfo><Object Id="Object-CQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><SignatureProperties xmlns=""><SignatureProperty Id="SignatureProperty-CQT-Id-db6de1520a9c42fca73d94c50b4aedfe" Target="#CQT-Id-db6de1520a9c42fca73d94c50b4aedfe"><SigningTime>2022-01-04T08:34:09</SigningTime></SignatureProperty></SignatureProperties></Object></Signature></CQT></DSCKS></TBao>`
const type_xml_statement = 'accepted'
const cqtstatus = 5
const regtype = 1
/*
  received
  accepted
*/

const fxp = require("fast-xml-parser")
const he = require("he")
const objectMapper = require("object-mapper")
const MAP_RECEIVED_STATEMENT = {
  "MSo": "noti_form",
  "Ten": "noti_name",
  "So": "noti_taxnum",
  "DDanh": "place",
  "NTBao": "noti_taxdt",
  "MST": "stax",
  "TNNT": "sname",
  "TTKhai": "name",
  "MGDDTu": "tax_transcode",
  "TGGui": "time_send",
  "THop": "tax_status",
  "TGNhan": "tax_time",
  "DSLDKCNhan.LDo.MLoi": "err_code",
  "DSLDKCNhan.LDo.MTa": "err_des"
}
const MAP_SIGN_RECEIVED_STATEMENT = {
  "CQT.Signature.KeyInfo.X509Data.X509SubjectName": "cqt_sign",
  "CQT.Signature.Object.SignatureProperties.SignatureProperty.SigningTime": "cqt_dt",
}
const MAP_ACCEPTED_STATEMENT = {
  "DLTBao.MSo": "noti_form",
  "DLTBao.Ten": "noti_name",
  "DLTBao.DDanh": "place",
  "DLTBao.TCQTCTren": "taxo",
  "DLTBao.TCQT": "noti_taxname",
  "DLTBao.MST": "stax",
  "DLTBao.TNNT": "sname",
  "DLTBao.Ngay": "createdt",
  "DLTBao.HTDKy": "regtype",
  "DLTBao.TTXNCQT": "tax_status",
  "DLTBao.HThuc": "tax_typesign",
  "DLTBao.CDanh": "tax_sign",
  "DLTBao.DSLDKCNhan.LDo.DLTBao.DSLDKCNhan.LDo.MLoi": "err_code",
  "DLTBao.DSLDKCNhan.LDo.DLTBao.DSLDKCNhan.LDo.MTa": "err_des",
  "STBao.So": "noti_taxnum",
  "STBao.NTBao": "noti_taxdt"
}
const MAP_SIGN_ACCEPTED_STATEMENT = {
  "CQT.Signature.KeyInfo.X509Data.X509SubjectName": "cqt_sign",
  "CQT.Signature.Object.SignatureProperties.SignatureProperty.SigningTime": "cqt_dt",
  "TTCQT.Signature.KeyInfo.X509Data.X509SubjectName": "ttcqt_sign",
  "TTCQT.Signature.Object.SignatureProperties.SignatureProperty.SigningTime": "ttcqt_dt",
}
const optx2j = {
  parseTrueNumberOnly: true,
  attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),
  tagValueProcessor: (val, tagName) => he.decode(val),
}

function map_json_received_form_xml (json) {
  let new_json = {}
    , new_sign = {}
    , DLTBao = json.TBao.DLTBao
    , ListSignature = json.TBao.DSCKS
  new_json = objectMapper(DLTBao, MAP_RECEIVED_STATEMENT)
  new_sign = objectMapper(ListSignature, MAP_SIGN_RECEIVED_STATEMENT)
  if (new_sign.cqt_sign !== undefined) {
    let arr_cqt_sign = new_sign.cqt_sign.split(",")
      , cqt_sign = arr_cqt_sign.find(element => element.includes("CN=")).trim()
    new_sign.cqt_sign = cqt_sign.replace("CN=", "")
  }
  if (new_sign.cqt_dt !== undefined) { new_sign.cqt_dt = new_sign.cqt_dt.replace("T", " ") }
  new_json = {
    ...new_json,
    ...new_sign
  }
  return new_json
}

function map_json_accepted_form_xml (json) {
  let new_json = {}
    , new_sign = {}
    , TBao = json.TBao
    , ListSignature = json.TBao.DSCKS
  new_json = objectMapper(TBao, MAP_ACCEPTED_STATEMENT)
  new_sign = objectMapper(ListSignature, MAP_SIGN_ACCEPTED_STATEMENT)
  if (new_sign.cqt_sign !== undefined) {
    let arr_cqt_sign = new_sign.cqt_sign.split(",")
      , cqt_sign = arr_cqt_sign.find(element => element.includes("CN=")).trim()
    new_sign.cqt_sign = cqt_sign.replace("CN=", "")
  }
  if (new_sign.cqt_dt !== undefined) { new_sign.cqt_dt = new_sign.cqt_dt.replace("T", " ") }
  if (new_sign.ttcqt_sign !== undefined) {
    let arr_ttcqt_sign = new_sign.ttcqt_sign.split(",")
      , ttcqt_sign = arr_ttcqt_sign.find(element => element.includes("CN=")).trim()
    new_sign.ttcqt_sign = ttcqt_sign.replace("CN=", "")
  }
  if (new_sign.ttcqt_dt !== undefined) { new_sign.ttcqt_dt = new_sign.ttcqt_dt.replace("T", " ") }
  new_json = {
    ...new_json,
    ...new_sign
  }
  return new_json
}

function xml2Json(xml) {
  let json = fxp.parse(xml, optx2j, true)
    , result_json = map_json_accepted_form_xml(json)
  switch (type_xml_statement) {
    case 'received':
      result_json = map_json_received_form_xml(json)
    case 'accepted':
      result_json = map_json_accepted_form_xml(json)
  }
  result_json["cqtstatus"] = cqtstatus
  result_json["regtype"] = regtype
  result_json = JSON.stringify(result_json)
  return result_json
}

console.log(xml2Json(xml_input))