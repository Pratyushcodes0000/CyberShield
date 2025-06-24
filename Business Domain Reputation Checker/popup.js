const VT_API_KEY = "ee602c40f61368026fdbd195ec8cab8b9af93a153f0f0e50db28de531420b880";
const WHOIS_API_KEY = "at_ZUzdhPdbUfJMuoVXGRC31EjIf0edf";

document.getElementById("scanBtn").addEventListener("click", async () => {
  const domain = document.getElementById("domainInput").value.trim();
  if (!domain) return;

  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("resultBox").innerHTML = "";

  const resultBox = document.getElementById("resultBox");

  try {
    // WHOIS API call
    const whoisRes = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${WHOIS_API_KEY}&domainName=${domain}&outputFormat=JSON`);
    const whoisData = await whoisRes.json();

    const creationDate = whoisData.WhoisRecord.createdDate || "Unknown";
    const registrar = whoisData.WhoisRecord.registrarName || "Unknown";

    // VirusTotal API call
    const vtRes = await fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, {
      headers: { "x-apikey": VT_API_KEY }
    });
    const vtData = await vtRes.json();

    const malicious = vtData.data.attributes.last_analysis_stats.malicious;
    const reputation = vtData.data.attributes.reputation;

    let riskLevel = "🟢 Safe";
    if (malicious > 0 || reputation < 0) {
      riskLevel = "🔴 Suspicious";
    } else if (reputation === 0) {
      riskLevel = "🟡 Unknown";
    }

    resultBox.innerHTML = `
      <strong>Domain:</strong> ${domain}<br/>
      <strong>Created:</strong> ${creationDate}<br/>
      <strong>Registrar:</strong> ${registrar}<br/>
      <strong>VirusTotal Reputation:</strong> ${reputation}<br/>
      <strong>Malicious Flags:</strong> ${malicious}<br/>
      <strong>Risk:</strong> <b>${riskLevel}</b>
    `;
  } catch (e) {
    resultBox.innerHTML = `<span style="color: red;">Error fetching data. Please check domain and API keys.</span>`;
  } finally {
    document.getElementById("loader").classList.add("hidden");
  }
});
