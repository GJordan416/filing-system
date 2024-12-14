document.getElementById("filingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const caseName = document.getElementById("caseName").value;
  const caseNumber = document.getElementById("caseNumber").value;
  const fileInput = document.getElementById("file");
  
  if (fileInput.files.length === 0) {
    alert("Please select a file.");
    return;
  }

  const file = fileInput.files[0];

  // Discord Webhook URL (Replace with your webhook)
  const webhookURL = "https://discord.com/api/webhooks/1313312647344689163/L0R54rCuqLcdEau7TXgveaE5GuKdtMpBcYnFBkguqAY56F1vUL1vJqe0d5HLP4YVilSF";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("payload_json", JSON.stringify({
    content: `New judicial filing submitted!\n**Case Name:** ${caseName}\n**Case Number:** ${caseNumber}`
  }));

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      document.getElementById("message").textContent = "File submitted successfully!";
      document.getElementById("message").style.color = "green";
    } else {
      throw new Error("Failed to submit the file.");
    }
  } catch (error) {
    document.getElementById("message").textContent = error.message;
    document.getElementById("message").style.color = "red";
  }
});
