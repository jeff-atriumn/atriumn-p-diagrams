import inquirer from "inquirer";
import fs from "fs/promises";

// Define the questions for the CLI
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of the slideshow?",
  },
  {
    type: "input",
    name: "inputs",
    message:
      "What are the inputs to your system? (Enter a comma-separated list)",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  try {
    let inputs = answers.inputs.split(",").map((input) => input.trim());
    answers.inputs = inputs;

    // Write the answers to a JavaScript file
    const content = `const data = ${JSON.stringify(answers, null, 2)};`;
    await fs.writeFile("./data.js", content, "utf8");

    // Create the HTML file based on a template
    const html = `
    <!DOCTYPE html>
    <html lang="en" prefix="og: http://ogp.me/ns#">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>{{title}} P Diagram</title>
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
                <section>
                <div class="wrap">
                    <div class="grid vertical-align">
                    <div class="column">
                        <h4>
                        <svg class="fa-envelope">
                            <use xlink:href="#fa-envelope"></use>
                        </svg>
                        <strong>Inputs</strong>
                        </h4>
                        <h5 id="title"></h5>
                        <ul class="description" id="inputs">
                        </ul>
                    </div>
                    <div class="column">
                        <figure>
                        <img
                            class="aligncenter"
                            src="static/images/setup.png"
                            alt="System Function"
                        />
                        </figure>
                    </div>
                    <div class="column">
                        <h4>
                        <svg class="fa-cubes">
                            <use xlink:href="#fa-cubes"></use>
                        </svg>
                        <strong>Outcomes</strong>
                        </h4>
                        <p>
                        The best way to <strong>inspire with your content</strong> is
                        to connect on a personal level:
                        </p>
                        <ul class="description">
                        <li>
                            Background images:
                            <a href="http://unsplash.com">Unsplash</a>.
                        </li>
                        </ul>
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
                document.getElementById('title').textContent = data.title;
                const inputsList = document.getElementById('inputs');
                data.inputs.forEach(input => {
                    const li = document.createElement('li');
                    li.textContent = input;
                    inputsList.appendChild(li);
                });
                </script>
            </body>
        </html>
    `;
    await fs.writeFile("./index.html", html, "utf8");
  } catch (err) {
    console.error(err);
  }
});
