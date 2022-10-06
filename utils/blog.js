require("dotenv").config();

// const octokit = new Octokit({
//auth: process.env.GitHub_Key,
//   auth: process.env.Backup_GitHub_Key,
// });

//our rate limit for these requests with octokit is either 1,000/hour or 5,000/hour, I'm honestly not sure
//Get a backup API key as well for presentation day

// let hardcodedCringe = [
//   { firstName: "Casey", lastName: "Chartier", username: "MustyBraid" },
//   { firstName: "Milantea", lastName: "Adams", username: "milantea" },
//   { firstName: "Shannon", lastName: "Kendall", username: "shannie14" },
//   { firstName: "DJ", lastName: "McMillan", username: "deejerz88" },
//   { firstName: "Donna", lastName: "Bussure", username: "bussudo" },
//   { firstName: "Jase", lastName: "Mucene", username: "Jmucene" },
//   { firstName: "Mim", lastName: "Armand", username: "mim-Armand" },
//   { firstName: "Austin", lastName: "Leblanc", username: "austinleblanc" },
//   { firstName: "Derek", lastName: "Hoye", username: "DLHoye" },
//   { firstName: "Justin", lastName: "Thon", username: "Limpbrick" },
//   { firstName: "Doug", lastName: "Schulte", username: "dkschulte" },
//   { firstName: "Grady", lastName: "Peck", username: "GradyPeck" },
// ];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function blogList(length) {
  let final = [];
  let chosenUsers = [];
  for (let i = 0; i < length; ) {
    let randomUser = user[getRandomInt(user.length)];
    // let randomUser = hardcodedCringe[getRandomInt(hardcodedCringe.length)];

    if (!chosenUsers.includes(randomUser.email)) {
      chosenUsers.push(randomUser.email);
      a = await blogRequest(randomUser.email, 10);
      // if (a.urls) {
      //   for (let j = 0; j < a.urls.length; ) {
      //     if (!final.includes(a.urls[j])) {
      //       final.push(
      // `${randomUser.name} recently updated a project at ${a.urls[j]}`
      `${randomUser.email} recently created a blog `;
      i++;
      break;
    } else {
      //   j++;
      // }
    }
  }
}
return final;

function contributionFilter(event) {
  if (
    event.type == "PullRequestReviewEvent" ||
    "PushEvent" ||
    "ReleaseEvent" ||
    "CreateEvent"
  ) {
    return true;
  }
  return false;
}

function uniqueFilter(event) {
  let urls = [];
  let goodEvents = []; //This copies the events the urls above are from. They should share the same index number
  for (let i = 0; i < event.length; i++) {
    if (!urls.includes(event[i].repo.url)) {
      urls.push(event[i].repo.url);
      goodEvents.push(event[i]);
    }
    //It's just now occurring to me that we can probably just take the first goodEvent for the main page,
    //but this code will be necessary for the profile page implementation
  }
  return [urls, goodEvents];
}

// const blogRequest = async (username, number) => {
//   let { data: publicEvents } = await octokit.request(
//     "GET /users/{username}/events/public",
//     {
//       username: username,
//       per_page: number, //Change this variable to change how many events we're requesting from any one user before filtering
//     }
//   );
//   publicEvents = publicEvents.filter(contributionFilter);
//   publicEvents = uniqueFilter(publicEvents);
//   formattedEvents = { urls: publicEvents[0], repos: publicEvents[1] };
//   //console.log(publicEvents); //note that this is a length 2 array defined in uniqueFilter
//   return formattedEvents;
// };

blogList(5);
module.exports = { blogRequest, blogList };
