import express from "express";

const app = express();

app.use(express.json());

// array of our *objectively* good languages
let languages = [
  {
    name: "Javascript",
    year: 1995,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    name: "Java",
    year: 1995,
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
  },
];

app.get("/", (req, res) => {
  // we can send HTML to the client, and the client renders it beautifully
  res.send(
    `<h1>Here are a list of my favorite programming languages:</h1>
    <div>
        <a href='/languages'>/languages endpoint</a>
        <p>Make a POST request to \`/create\` (with parameters of language name, year, and image link, just like the structure in the \`/languages\` endpoint) to add to the list!</p>
    </div>`
  );
});

app.get("/languages", (req, res) => {
  // send the array to the user, in JSON format so that the client can render it to look nice
  res.json(languages);
});

app.post("/create", (req, res) => {
  try {
    /*
        req.body should look something like this:

        {
            name: "",
            year: ,
            image: ""
        }
      */

    // This is the destructuring assignment;
    // We take certain data *out* of this req.body
    // the names below are variable names *as well *as*
    // what they were in the req.body object

    const { name, year, image } = req.body;

    // push data on the `languages` array,
    // in the form of the JSON body that we want

    languages.push({
      name: name,
      year: year,
      image: image,
    });
  } catch (err) {
    // send an HTTP status code 500 (internal server error) to the client,
    // something has gone wrong

    res.status(500).json({ success: "false", error: err });
  }

  res.send("you ar egood");
});

app.listen(5000, () => {
  console.log("⚡ Listening on port 5000");
});
