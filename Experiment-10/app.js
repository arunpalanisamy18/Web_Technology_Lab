
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const client = new MongoClient(
    "mongodb://127.0.0.1:27017"
);

app.use(express.urlencoded({ extended: true }));

let users;

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}

app.get("/", (req, res) => {
    res.sendFile(
        require("path").join(__dirname, "home.html")
    );
});

app.post("/server", async (req, res) => {
    try {
        const {
            name,
            password,
            age,
            mobile,
            email,
            gender,
            state
        } = req.body;

        const skills = []
            .concat(req.body.skills || [])
            .filter(Boolean);

        const user = {
            name,
            password,
            age: Number(age),
            mobile,
            email,
            gender,
            state,
            skills,
            createdAt: new Date()
        };

        await users.insertOne(user);

        const details = [
            ["Name", name],
            ["Password", password],
            ["Age", age],
            ["Mobile Number", mobile],
            ["Email", email],
            ["Gender", gender],
            ["State", state],
            ["Skills", skills.join(", ") || "None selected"]
        ];

        const rows = details.map(([label, value]) => `
            <tr>
                <th>${escapeHTML(label)}</th>
                <td>${escapeHTML(value)}</td>
            </tr>
        `).join("");

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0">
                <title>Registration Successful</title>

                <style>
                    
                      * {
                          box-sizing: border-box;
                      }

                      body {
                          margin: 0;
                          min-height: 100vh;
                          padding: 38px 16px;
                          display: flex;
                          justify-content: center;
                          align-items: flex-start;
                          font-family: Arial, sans-serif;
                          color: #172033;
                          background:
                              radial-gradient(circle at 5% 5%, #ddd6fe, transparent 35%),
                              radial-gradient(circle at 95% 95%, #bae6fd, transparent 35%),
                              #f1f5f9;
                      }

                      .card {
                          width: 100%;
                          max-width: 770px;
                          margin: 15px auto;
                          padding: 32px 36px;
                          background: #fff;
                          border: 1px solid #e2e8f0;
                          border-radius: 16px;
                          box-shadow: 0 14px 38px rgba(30, 41, 59, 0.12);
                      }

                      .tag {
                          margin: 10px 0 22px;
                          text-align: center;
                          color: #6366f1;
                          font-size: 11px;
                          font-weight: bold;
                          letter-spacing: 2px;
                      }

                      h1 {
                          margin: 0 0 24px;
                          text-align: center;
                          color: #273778;
                          font-size: 32px;
                      }

                      .subtitle {
                          margin-bottom: 26px;
                          text-align: center;
                          color: #64748b;
                          font-size: 14px;
                      }

                      table {
                          width: 100%;
                          margin-top: 0;
                          border-collapse: collapse;
                          font-size: 15px;
                      }

                      th,
                      td {
                          padding: 13px;
                          border: 1px solid #e2e8f0;
                          text-align: left;
                          overflow-wrap: anywhere;
                      }

                      th {
                          width: 36%;
                          background: #f8fafc;
                          color: #334155;
                      }

                      .button {
                          display: block;
                          width: fit-content;
                          margin: 36px auto 0;
                          padding: 13px 26px;
                          border-radius: 7px;
                          background: linear-gradient(100deg, #4f46e5, #6366f1);
                          color: white;
                          text-decoration: none;
                          font-size: 14px;
                          font-weight: bold;
                          transition: transform 0.2s, box-shadow 0.2s;
                      }

                      .button:hover {
                          transform: translateY(-2px);
                          box-shadow: 0 6px 16px #4f46e433;
                      }

                      footer {
                          margin-top: 20px;
                          text-align: center;
                          color: #64748b;
                          font-size: 11px;
                      }

                      @media (max-width: 560px) {
                          .card {
                              padding: 24px 17px;
                          }

                          h1 {
                              font-size: 25px;
                          }

                          th,
                          td {
                              padding: 10px 8px;
                              font-size: 13px;
                          }
                      }
                </style>
            </head>

            <body>
                <main class="card">
                    <p class="tag">
                        EXPERIMENT 10 · NODE.JS + MONGODB
                    </p>

                    <h1>Registration Successful</h1>

                    <p class="subtitle">
                        Your details have been saved successfully.
                    </p>

                    <table>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>

                    <a class="button" href="/">
                        Register Another User
                    </a>

                    <footer>
                        Powered by Node.js · Express · MongoDB
                    </footer>
                </main>
            </body>
            </html>
        `);
    } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).send(
            "Registration failed. Check the server terminal."
        );
    }
});

async function startServer() {
    await client.connect();

    users = client
        .db("registrationDB")
        .collection("users");

    app.listen(PORT, () => {
        console.log(
            `Server running at http://localhost:${PORT}`
        );
    });
}

startServer().catch((error) => {
    console.error(
        "Could not connect to MongoDB:",
        error.message
    );

    process.exit(1);
});
