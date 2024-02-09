import inquirer from "inquirer";
import fs from "fs/promises";

// Define the questions for the CLI
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your function or system?",
  },
  {
    type: "input",
    name: "inputs",
    message:
      "What are the inputs to your system? (Enter a comma-separated list)",
  },
  {
    type: "input",
    name: "outcomes",
    message:
      "What are the outcomes of your system? (Enter a comma-separated list)",
  },
  {
    type: "input",
    name: "noise",
    message:
      "What are the noise factors of your system? (Enter a comma-separated list)",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  try {
    let inputs = answers.inputs.split(",").map((input) => input.trim());
    answers.inputs = inputs;

    let outcomes = answers.outcomes.split(",").map((input) => input.trim());
    answers.outcomes = outcomes;

    let noise = answers.noise.split(",").map((input) => input.trim());
    answers.noise = noise;

    const content = `const data = ${JSON.stringify(answers, null, 2)};`;
    await fs.writeFile("./data.js", content, "utf8");

    // Create the HTML file based on a template
    const html = `
    <!DOCTYPE html>
    <html lang="en" prefix="og: http://ogp.me/ns#">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name="description" content="Generated Atriumn P-Diagram." />

            <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,700,700i%7CMaitree:200,300,400,600,700&amp;subset=latin-ext"
            rel="stylesheet"
            />

            <link
            rel="stylesheet"
            type="text/css"
            media="all"
            href="static/css/webslides.css"
            />

            <link
            rel="stylesheet"
            type="text/css"
            media="all"
            href="static/css/svg-icons.css"
            />

            <link
            rel="shortcut icon"
            sizes="16x16"
            href="static/images/favicons/favicon.png"
            />
            <link
            rel="shortcut icon"
            sizes="32x32"
            href="static/images/favicons/favicon-32.png"
            />
            <link
            rel="apple-touch-icon icon"
            sizes="76x76"
            href="static/images/favicons/favicon-76.png"
            />
            <link
            rel="apple-touch-icon icon"
            sizes="120x120"
            href="static/images/favicons/favicon-120.png"
            />
            <link
            rel="apple-touch-icon icon"
            sizes="152x152"
            href="static/images/favicons/favicon-152.png"
            />
            <link
            rel="apple-touch-icon icon"
            sizes="180x180"
            href="static/images/favicons/favicon-180.png"
            />
            <link
            rel="apple-touch-icon icon"
            sizes="192x192"
            href="static/images/favicons/favicon-192.png"
            />

            <!-- Android -->
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#333333" />
        </head>
        <body>
            <header role="banner">
                <nav role="navigation">
                    <p class="logo">
                    <a href="{{title}}-p-diagram.html" title="Atriumn P-Diagram"
                        >P Diagram</a
                    >
                    </p>
                    <ul>
                        <li class="github">
                            <a
                            rel="external"
                            href="https://github.com/jeff-atriumn/atriumn-p-diagrams"
                            title="Github"
                            >
                            <svg class="fa-github">
                                <use xlink:href="#fa-github"></use>
                            </svg>
                            <em>Atriumn</em>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main role="main">
            <article id="webslides" class="vertical">
                <section class="bg-apple aligncenter">
                    <div
                        id="title"
                        style="
                            position: fixed;
                            right: 20px;
                            bottom: 20px;
                            color: #aaa;
                            font-size: 5vw;
                        "
                        >
                        {data.title}
                    </div>
                    <div class="wrap">
                        <div
                            class="grid"
                            style="display: flex; flex-direction: column; align-items: center"
                        >
                            <div class="row">
                                <h4>
                                    <svg class="fa-music">
                                    <use xlink:href="#fa-music"></use>
                                    </svg>
                                    <strong>Noise</strong>
                                </h4>
                                <h5 id="title"></h5>
                                <ul class="description noise" id="noise"></ul>
                            </div>

                            <div
                            class="row"
                            style="
                                display: flex;
                                justify-content: space-between;
                                width: 80%;
                            "
                            >
                                <div class="column" style="text-align: right">
                                    <h4>
                                    <svg class="fa-envelope">
                                        <use xlink:href="#fa-envelope"></use>
                                    </svg>
                                    <strong>Inputs</strong>
                                    </h4>
                                    <ul class="description" id="inputs"></ul>
                                </div>

                                <div class="column">
                                    <figure>
                                    <div
                                        style="
                                        background-color: black;
                                        color: white;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        height: 200px;
                                        width: 200px;
                                        "
                                    >
                                        {data.title}
                                    </div>
                                    </figure>
                                </div>

                                <div class="column" style="text-align: left">
                                    <h4>
                                    <svg class="fa-cubes">
                                        <use xlink:href="#fa-cubes"></use>
                                    </svg>
                                    <strong>Outcomes</strong>
                                    </h4>
                                    <h5 id="title"></h5>
                                    <ul class="description" id="outcomes"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
              </article>
            </main>
            <script src="static/js/webslides.js"></script>
            <script>
            window.ws = new WebSlides();
            </script>

            <script defer src="static/js/svg-icons.js"></script>
            <script src="data.js"></script>

            <script>
                document.title = data.title;
                const inputsList = document.getElementById('inputs');
                data.inputs.forEach(input => {
                    const li = document.createElement('li');
                    li.textContent = input;
                    inputsList.appendChild(li);
                });

                const outcomesList = document.getElementById('outcomes');
                data.outcomes.forEach(outcome => {
                    const li = document.createElement('li');
                    li.textContent = outcome;
                    outcomesList.appendChild(li);
                });

                const noiseList = document.getElementById('noise');
                data.noise.forEach(n => {
                    const li = document.createElement('li');
                    li.textContent = n;
                    noiseList.appendChild(li);
                });

                const figureDiv = document.querySelector('.column figure div');
                figureDiv.textContent = data.title;

                const titleElement = document.getElementById('title');
                titleElement.textContent = data.title;
            </script>
        </body>
    </html>
    `;
    await fs.writeFile("./index.html", html, "utf8");
  } catch (err) {
    console.error(err);
  }
});
