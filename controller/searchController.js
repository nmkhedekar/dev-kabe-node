const { openai } = require("../utils/openaiConf");

const getSearchResultController = async (req, res) => {
    const generatePrompt = (animal) => {
        const capitalizedAnimal =
            animal[0].toUpperCase() + animal.slice(1).toLowerCase();
        return `Suggest three names for an animal that is a superhero.
      
      Animal: Cat
      Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
      Animal: Dog
      Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
      Animal: ${capitalizedAnimal}
      Names:`;
    }
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(req.body.animalname),
        temperature: 0.6,
    });
    console.log("serchedResult");
    res.status(201).json({ result: completion.data.choices[0].text });
}

const generateImageController = async (req, res) => {
    const response = await openai.createImage({
        prompt: req.body.text,
        n: 10,
        size: "1024x1024",
    });
    res.status(201).json({ result: response.data })
}

const autoCompletion = async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.sentence,
        max_tokens: 7,
        temperature: 0,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
        stop: "\n"
    });
    res.status(201).json({ result: response.data });
}

const spellChecker = async (req, res) => {
    const response = await openai.createEdit({
        model: "text-davinci-edit-001",
        input: req.body.sentence,
        instruction: "Fix the spelling mistakes",
    });
    res.status(201).json({ result: response.data });
}

const createModeration = async (req, res) => {
    const response = await openai.createModeration({
        input: req.body.sentence,
    });
    res.status(201).json({ result: response.data });
}

module.exports = {
    getSearchResultController,
    generateImageController,
    autoCompletion,
    spellChecker,
    createModeration
}