import React from "react";
import { authorization, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const insertData = async (email) => {
  const data = {
    email,
  };

  try {
    await addDoc(collection(db, "subscriber"), data);
  } catch (e) {
    console.log(e);
  }
};

async function subscribe(req, res) {
  if (!req.body) {
    return res.status(500).json({ error: "Please use post method" });
  }
  if (!req.body.email) {
    return res.status(500).json({ error: "Please post an email" });
  }
  const emailHtml = `<!DOCTYPE html>

  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
      <title></title>
      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <style>
          * {
              box-sizing: border-box;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }
  
          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          @media (max-width:720px) {
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .row-content {
                  width: 100% !important;
              }
  
              .image_block img.big {
                  width: auto !important;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
          }
      </style>
  </head>
  
  <body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
          <tbody>
              <tr>
                  <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <div class="spacer_block"
                                                          style="height:10px;line-height:10px;font-size:1px;"> </div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div align="center" style="line-height:10px"><a
                                                                          href="https://edafter.com" style="outline:none"
                                                                          tabindex="-1" target="_blank"><img alt="Edafter"
                                                                              src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643303380/new_full_logo_with_white_back_kmrxta.png"
                                                                              style="display: block; height: auto; border: 0; width: 175px; max-width: 100%;"
                                                                              title="Edafter" width="175" /></a></div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div align="center" style="line-height:10px"><img
                                                                          alt="Alternate text" class="big"
                                                                          src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643646792/email/Up_pink_bqhsyr.png"
                                                                          style="display: block; height: auto; border: 0; width: 700px; max-width: 100%;"
                                                                          title="Alternate text" width="700" /></div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffd3e0; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="width:100%;padding-right:0px;padding-left:0px;padding-top:30px;">
                                                                  <div align="center" style="line-height:10px"><img
                                                                          alt="I'm an image"
                                                                          src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643646795/email/Welcome_Email_ibkcaw.png"
                                                                          style="display: block; height: auto; border: 0; width: 420px; max-width: 100%;"
                                                                          title="I'm an image" width="420" /></div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 18px; color: #191919; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                                                          <p
                                                                              style="margin: 0; font-size: 16px; text-align: center;">
                                                                              <strong><span style="font-size:38px;">Hi
                                                                                      ${req.body.email}, </span></strong>
                                                                          </p>
                                                                          <p
                                                                              style="margin: 0; font-size: 16px; text-align: center;">
                                                                              <strong><span
                                                                                      style="font-size:38px;">welcome to
                                                                                      Edafter!</span></strong>
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:65px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #191919; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                                                          <p
                                                                              style="margin: 0; font-size: 14px; text-align: center;">
                                                                              <span style="font-size:22px;">Thank you for
                                                                                  subscribing!</span>
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-left:20px;padding-right:20px;padding-top:35px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 18px; color: #191919; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                                                          <p
                                                                              style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 42px;">
                                                                              <span style="font-size:28px;"><strong><span
                                                                                          style="">Let's Get
                                                                                          Started</span></strong></span>
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="5" cellspacing="0"
                                                          class="divider_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td>
                                                                  <div align="center">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                          width="15%">
                                                                          <tr>
                                                                              <td class="divider_inner"
                                                                                  style="font-size: 1px; line-height: 1px; border-top: 2px solid #FFD3E0;">
                                                                                  <span> </span>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="divider_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td>
                                                                  <div align="center">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                          width="5%">
                                                                          <tr>
                                                                              <td class="divider_inner"
                                                                                  style="font-size: 1px; line-height: 1px; border-top: 2px solid #FFD3E0;">
                                                                                  <span> </span>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="button_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td>
                                                                  <div align="center">
                                                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://gpc.edafter.com" style="height:42px;width:93px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#3AAEE0"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a
                                                                          href="https://gpc.edafter.com"
                                                                          style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#3AAEE0;border-radius:4px;width:auto;border-top:1px solid #3AAEE0;border-right:1px solid #3AAEE0;border-bottom:1px solid #3AAEE0;border-left:1px solid #3AAEE0;padding-top:5px;padding-bottom:5px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"
                                                                          target="_blank"><span
                                                                              style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span
                                                                                  style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Explore</span></span></a>
                                                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="social_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:50px;text-align:center;">
                                                                  <table align="center" border="0" cellpadding="0"
                                                                      cellspacing="0" class="social-table"
                                                                      role="presentation"
                                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                      width="138px">
                                                                      <tr>
                                                                          <td style="padding:0 7px 0 7px;"><a
                                                                                  href="https://www.facebook.com/"
                                                                                  target="_blank"><img alt="Facebook"
                                                                                      height="32"
                                                                                      src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643646792/email/facebook2x_mhhrbm.png"
                                                                                      style="display: block; height: auto; border: 0;"
                                                                                      title="Facebook" width="32" /></a>
                                                                          </td>
                                                                          <td style="padding:0 7px 0 7px;"><a
                                                                                  href="https://www.instagram.com/m_urad07/"
                                                                                  target="_blank"><img alt="Instagram"
                                                                                      height="32"
                                                                                      src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643646792/email/instagram2x_dl2jt4.png"
                                                                                      style="display: block; height: auto; border: 0;"
                                                                                      title="Instagram" width="32" /></a>
                                                                          </td>
                                                                          <td style="padding:0 7px 0 7px;"><a
                                                                                  href="https://www.youtube.com/channel/UCROFxqRh6JkWtea-tlW4y0Q"
                                                                                  target="_blank"><img alt="YouTube"
                                                                                      height="32"
                                                                                      src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643646793/email/youtube2x_socpka.png"
                                                                                      style="display: block; height: auto; border: 0;"
                                                                                      title="YouTube" width="32" /></a>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 24px; color: #555555; line-height: 2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                                                          <p
                                                                              style="margin: 0; font-size: 14px; text-align: center;">
                                                                              If you have any questions, feel free message
                                                                              us at edafter2022@gmail.com. Edafter All
                                                                              right reserved. <a
                                                                                  href="https://edafter.com/unsubscribe"
                                                                                  rel="noopener"
                                                                                  style="text-decoration: none; color: #5006fd;"
                                                                                  target="_blank">unsubscribe</a>.</p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:40px;padding-right:40px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 24px; color: #555555; line-height: 2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                                                          <p
                                                                              style="margin: 0; font-size: 14px; text-align: center;">
                                                                              5 B Nangloi Najafgarh Road New Delhi 110041.
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="text_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td>
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2;">
                                                                          <p
                                                                              style="margin: 0; font-size: 12px; text-align: center;">
                                                                              <span style="color:#555555;"><a
                                                                                      href="https://gpc.edafter.com/terms-and-conditions"
                                                                                      rel="noopener"
                                                                                      style="text-decoration: underline; color: #0368c8;"
                                                                                      target="_blank">Terms of use</a>
                                                                                  <strong>|</strong> <a
                                                                                      href="https://gpc.edafter.com/privacy-policy"
                                                                                      rel="noopener"
                                                                                      style="text-decoration: underline; color: #0368c8;"
                                                                                      target="_blank">Privacy
                                                                                      Policy</a></span>
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;"
                                          width="700">
                                          <tbody>
                                              <tr>
                                                  <td class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div align="center" style="line-height:10px"><img
                                                                          alt="Alternate text" class="big"
                                                                          src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643646792/email/white_down_fifukg.png"
                                                                          style="display: block; height: auto; border: 0; width: 700px; max-width: 100%;"
                                                                          title="Alternate text" width="700" /></div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
  
  
                  </td>
              </tr>
          </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table><!-- End -->
  </body>
  
  </html>`;
  if (insertData(req.body.email)) {
    try {
      await sendgrid.send({
        to: `${req.body.email}`, // Your email where you'll receive emails
        from: "Edafter<info@edafter.com>", // your website email address here
        replyTo: "edafter2022@gmail.com",
        subject: "Welcome! Thanks for Subscribe",
        html: emailHtml,
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

export default subscribe;
