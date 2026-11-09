const result_container = document.querySelector("#resultContainer");
const api_url = "https://artificialintelligencejobs.co/api/jobs";
const loader = document.querySelector("#loader");
const jobSearchForm = document.querySelector("#jobSearchForm");

async function get_jobs(parameters) {
  try {
    loader.style.display = "flex";
    const res = await fetch(`${api_url}?${parameters}`);
    const jobs = await res.json();
    return jobs;
  } catch (error) {
    console.log(error);
    alert(error);
  } finally {
    loader.style.display = "none";
  }
}

async function load_jobs(parameters) {
  result_container.innerHTML = "";
  const jobs = await get_jobs(parameters);
  if (jobs.jobs<1) {
    alert("There is no relavent jobs find...");
  } else {
    jobs.jobs.forEach((job) => {
      const job_card = document.createElement("div");
      job_card.className = "job-card";
      job_card.innerHTML = `
        <div class="card-head">
            <h3>${job.title}</h3>
            <span>${job.posted}</span>
        </div>
        <p><i class="fa-regular fa-building"></i> ${job.company}</p>
        <p><i class="fa-solid fa-location-dot"></i> ${job.location}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> ${job.salary ? job.salary : "-"}</p>
        <a href="${job.apply_url}" class="apply-btn">Apply now</a>`;
      result_container.appendChild(job_card);
    });
  }
}

jobSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const job_role = jobSearchForm.job_role.value.replace(" ", "+");
  const city = jobSearchForm.city.value.replace(" ", "+");
  const salary = jobSearchForm.salary.value.replace(" ", "+");
  const level = jobSearchForm.level.value.replace(" ", "+");
  const remote = jobSearchForm.remote.checked;

  let querys = [];

  if (job_role) {
    querys.push(`q=${job_role}`);
  }
  if (city) {
    querys.push(`city=${city}`);
  }
  if (salary) {
    querys.push(`salary=${salary}`);
  }
  if (level) {
    querys.push(`level=${level}`);
  }
  if (remote) {
    querys.push(`remote=${remote}`);
  }
  let query = querys.join("&");
  query = query ? query : "limit=20";
  load_jobs(query);
});

load_jobs("limit=20");
