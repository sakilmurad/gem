import React from "react";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

function sendmail() {
  const ClientID =
    "205248276111-4o3hf1bcg4lhkvipo66ctaejgcfoev8f.apps.googleusercontent.com";
  const ClientSecret = "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";
  const refreshToken =
    "1//04hSr6NTWsLwiCgYIARAAGAQSNwF-L9Ir-BDZDKFqNbcX-wcDrb5dzsQXtdw1qXd9HNxziqB-635gG3ncng27mc2zcCuNKvTDeQI";
  const Email = "edafter2022@gmail.com";
  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      ClientID,
      ClientSecret,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: Email,
        accessToken,
        clientId: ClientID,
        clientSecret: ClientSecret,
        refreshToken: refreshToken,
      },
    });

    return transporter;
  };

  const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };

  sendEmail({
    subject: "Test",
    text: "I am sending an email from nodemailer!",
    to: "sakilmurad52@gmail.com",
    from: Email,
  });
}

export default sendmail;
