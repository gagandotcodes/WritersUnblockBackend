import titleServices from "../services/titleServices.js";


// login user
const generateTitles = async (request, response) => {
  console.log('request',request.body)
  const { keywords, difficulty } = request.body;
  const result = await titleServices.generateTitles(keywords, difficulty);

  if (!result.success) {
    return response.status(result.statusCode).send(result.message);
  }
  return response
    .status(result.statusCode)
    .send(result.result);
};



const titleController = {
    generateTitles
};
export default titleController;
