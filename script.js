document
  .getElementById("generateResume")
  .addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    const linkedin = document.getElementById("linkedin").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;
    const experience = document.getElementById("experience").value;
    const profilePic = document.getElementById("profilePic").files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;

      const resumePreview = `
            <div class="resume">
                <div class="header">
                    <img src="${imageUrl}" alt="Profile Picture" class="profile-pic">
                    <h2>${name}</h2>
                    <p>${contact} | ${email} | <a href="${linkedin}" target="_blank">LinkedIn</a></p>
                </div>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Skills</h3>
                <p>${skills
                  .split(",")
                  .map((skill) => `<span class="skill">${skill.trim()}</span>`)
                  .join(", ")}</p>
                <h3>Experience</h3>
                <p>${experience}</p>
            </div>
        `;

      document.getElementById("resumePreview").innerHTML = resumePreview;
      document.getElementById("downloadResume").style.display = "block";
    };

    if (profilePic) {
      reader.readAsDataURL(profilePic);
    }
  });

document
  .getElementById("downloadResume")
  .addEventListener("click", function () {
    const doc = new jsPDF();
    doc.fromHTML(document.getElementById("resumePreview").innerHTML, 15, 15, {
      width: 170,
    });
    doc.save("resume.pdf");
  });
