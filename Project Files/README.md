# ✈️ Airlines Management System – Salesforce App

This project contains a Salesforce Lightning App called **AirLine Management System**, stored in metadata format (`.app-meta.xml`) inside the `Project Files/` folder.

---

## 📁 Project Structure

default/
└── applications/
└── AirLine_Management_System.app-meta.xml

---

## ✅ Prerequisites

Before using this project, ensure you have the following installed:

- [Salesforce CLI (SFDX)](https://developer.salesforce.com/tools/sfdxcli)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) with:
  - [Salesforce Extensions Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)

---

## 🚀 Setup Instructions

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/dinesheswarreddy/Airlines-Management-System.git
cd Airlines-Management-System

🔐 2. Authorize a Salesforce Org
Use this to connect your Salesforce org (Dev Hub, Sandbox, or Developer Edition):

sfdx auth:web:login -a AirlineOrg

📦 3. Deploy the Lightning App
Deploy the metadata app to your connected org:

sfdx force:source:deploy -p "Project Files/applications/AirLine_Management_System.app-meta.xml" -u AirlineOrg

🔍 4. Confirm the App in Salesforce
Go to Setup > App Manager

Search for: AirLine Management System

Click Edit or Open to launch

🛠 Customization
You can edit the app metadata in:
Project Files/applications/AirLine_Management_System.app-meta.xml
