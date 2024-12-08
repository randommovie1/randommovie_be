"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTestEmail = sendTestEmail;
const mail_config_1 = require("../configs/mail.config");
function sendTestEmail() {
    mail_config_1.transporter.sendMail(Object.assign(Object.assign({}, mail_config_1.mailOptions), { to: '9eoclzhztv8zyld@tutamail.com', subject: 'Hello World', 
        // TODO: move this to /templates/emails/test.html
        html: `
            <html>
                <body>
                    <h1>Hello World!</h1>
                    <p>Hello World from RandomMovie! <b>HTML</b> content.</p>
                    <p>Visit our <a href="https://example.com">website</a> for more information.</p>
                    <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
                </body>
            </html>
            ` }), (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
}
//# sourceMappingURL=mail.service.js.map