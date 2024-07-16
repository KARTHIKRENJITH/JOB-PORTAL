const express = require('express');
const cors = require('cors');


const serviceSSID = process.env.SSID
const accountsid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN

const client = require("twilio")(accountsid,authToken);

const MobileLogin = async (req, res) => {
    const { phone } = req.body; // Change to match frontend
    console.log("Phoneeeenumber:", phone);
  
    if (!phone) {
      return res.status(400).json({ success: false, msg: "Phone number is required" });
    }
  
    console.log('Phone number:', phone);
  
    try {
      const response = await client.verify.services(serviceSSID)
       .verifications.create({
          to: `+91${phone}`,
          channel: "sms"
        });
  
      console.log("response", response);
      res.status(200).json({ success: true, msg: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      res.status(500).json({ success: false, msg: "Failed to send OTP", error: error.message });
    }
    }
  
  
  
  
  
  const Otp = async (req, res) => {
    const { otp, phone } = req.body;
    console.log("Received OTP:", otp);
    console.log("Received Phone Number:", phone);
  
    // Ensure both OTP and phone number are present
    if (!otp || !phone) {
      return res.status(400).json({ success: false, msg: "Phone number and OTP are required" });
    }
  
    try {
      const response = await client.verify.services(serviceSSID)
        .verificationChecks.create({
          to: `+91${phone}`,
          code: otp
        });
  
      console.log("Twilio Response:", response);
  
      if (response.status === "approved") {
        res.status(200).json({ success: true, msg: "OTP verified successfully" });
      } else {
        res.status(400).json({ success: false, msg: "Invalid OTP" });
      }
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ success: false, msg: "Failed to verify OTP", error: error.message });
    }
  }
  
  
  
    module.exports = {
      MobileLogin,
      Otp
  }