import React from "react";
import { authorization, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const insertData = async (email, service) => {
  const data = {
    email,
    service,
  };

  try {
    await addDoc(collection(db, "contact"), data);
  } catch (e) {
    console.log(e);
  }
};

async function start(req, res) {
  if (!req.body) {
    return res.status(500).json({ error: "Please use post method" });
  }
  if (!req.body.email) {
    return res.status(500).json({ error: "Please post an email" });
  }
  const emailHtml = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->

    <style type="text/css">
      body, p, div {
        font-family: inherit;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #e85042;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    <link href="https://fonts.googleapis.com/css?family=Chivo&display=swap" rel="stylesheet"><style>
body {font-family: 'Chivo', sans-serif;}
</style>
     <!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#e85042" data-body-style="font-size: 14px; font-family: inherit; color: #000000; background-color: #efefef;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#efefef">
          <tr>
            <td valign="top" bgcolor="#efefef" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="600">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left">
                                
    <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
           style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p>Hi dear, Thanks for new service request</p>
        </td>
      </tr>
    </table>
  
    <table  border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            data-version="2"
            style="padding:0px 03px 01px 03px;box-sizing:border-box;"
            bgcolor="">
      <tr role='module-content'>
        <td height="100%" valign="top">
            <!--[if (gte mso 9)|(IE)]>
              <center>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                  <tr>
            <![endif]-->
          
    <!--[if (gte mso 9)|(IE)]>
      <td width="594.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="594.000"
            style="width:594.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor=""
            class="column column-0 of-1
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 04px 0px;" valign="top" align="center">
          <a href="https://edafter.com"><img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;" width="180" alt="Edafter Logo" data-proportionally-constrained="true" data-responsive="false" src="https://res.cloudinary.com/dl3tfsbn5/image/upload/c_scale,h_70/v1643303380/new_full_logo_with_white_back_kmrxta.png" height="58"></a>
        </td>
      </tr>
    </table>
  
    <table class="module"
           role="module"
           data-type="divider"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 0px 0px;"
            role="module-content"
            height="100%"
            valign="top"
            bgcolor="">
          <table border="0"
                 cellpadding="0"
                 cellspacing="0"
                 align="center"
                 width="100%"
                 height="2px"
                 style="line-height:2px; font-size:2px;">
            <tr>
              <td
                style="padding: 0px 0px 2px 0px;"
                bgcolor="#ff6516"></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:010px 0px 010px 0px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <div style="text-align: center;"><span style="font-size:20px;">Thanks for your new service request.</span></div>

        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 18px 0px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <div>We got your request and we are happy to work with you. Please allow us 24 Hrs to work on your request and contact you back. Meanwhile you can read more thingh on Edafter.</div>

        </td>
      </tr>
    </table>
  <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" class="outer-td" style="padding:0px 30px 0px 0px"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#fd8174" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#fd8174;border:1px solid #e85042;border-color:#FD8174;border-radius:0px;border-width:1px;color:#ffffff;display:inline-block;font-size:14px;font-weight:normal;letter-spacing:0px;line-height:normal;padding:12px 18px 12px 18px;text-align:center;text-decoration:none;border-style:solid;font-family:inherit" href="https://edafter.com" target="_blank">See More</a></td></tr></tbody></table></td></tr></tbody></table>
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="">
            <div style="text-align: center;">© 2022 Edafter All right reserved.</div>
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                  <tr>
                </table>
              </center>
            <![endif]-->
        </td>
      </tr>
    </table>
  <div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#444444;font-size:12px;line-height:20px;padding:16px 16px 16px 16px;text-align:center"><p style="font-family:[Sender_Name];font-size:12px;line-height:20px"><a class="Unsubscribe--unsubscribeLink" href="<%asm_global_unsubscribe_raw_url%>">Unsubscribe</a> - <a class="Unsubscribe--unsubscribePreferences" href="{{{unsubscribe_preferences}}}">Unsubscribe Preferences</a></p></div>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td></tr></table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
  `;
  if (insertData(req.body.email, req.body.service)) {
    try {
      await sendgrid.send({
        to: `${req.body.email}`, // Your email where you'll receive emails
        from: process.env.SENDER_MAIL, // your website email address here
        replyTo: process.env.ADMIN_EMAIL,
        subject: "Thanks for your new service request",
        html: emailHtml,
      });
    } catch (error) {
      // console.log(error);
      return res.status(error.statusCode || 500).json({ error: error.message });
    }

    try {
      sendgrid.send({
        to: process.env.ADMIN_EMAIL,
        from: process.env.SENDER_MAIL, // your website email address here
        subject: `New service request from ${req.body.email}`,
        text: `
        Email: ${req.body.email},
        Service: ${req.body.service}
        `,
      });
    } catch (error) {
      // console.log(error);
      return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ success: "true" });
  } else {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default start;
