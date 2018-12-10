using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Net;


namespace backend.Services
{
    public class MailService
    {
        public string  email = "";
        private string mailSubject;
        private string mailBody;
        public void setCustomMessage(string title,string message)
        {
            this.mailSubject    = title;
            this.mailBody       = message;
        }
        public string sendEmail()
        {
            try
            {
                var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential("fashionhrprojectc@gmail.com", "guqfuV-veprit-miwbe0"),
                    EnableSsl = true
                };
                client.Send("fashionhrprojectc@gmail.com", this.email, this.mailSubject, this.mailBody);
                return this.email;
            }
            catch (System.Exception)
            {
                return "ERROR: something did go wrong.";
            }
        }


    }
}