function getQueryParameter(parameterName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
        }
function displaySchemeDetails() {
    { 
     const schemeDetailsContainer = document.getElementById("schemename");
     const name = getQueryParameter("name");
     schemeDetailsContainer.innerHTML = `
     <p>${name}</p>`;
    }
   {
     const schemeDetailsContainer = document.getElementById("Details");
     const features = getQueryParameter("features");
            schemeDetailsContainer.innerHTML = ` <p>${features}</p>`;
   }
  {
    const schemeDetailsContainer = document.getElementById("eligibility");
    const specific = getQueryParameter("specific");
            schemeDetailsContainer.innerHTML = `<p>${specific}</p>`;
  }
  const schemeDetailsContainer = document.getElementById("sources-and-references");
const reference = getQueryParameter("reference");
const bank = getQueryParameter("bank");
if (reference) {
    schemeDetailsContainer.innerHTML = `<a href="${reference}" target="_blank">To apply for the scheme, simply click here to visit the ${bank} official page.</a>`;
} else {
    schemeDetailsContainer.innerHTML = "<p>No reference parameter provided.</p>";
}
 {
    const schemeDetailsContainer = document.getElementById("documents-required");
            schemeDetailsContainer.innerHTML = `<p>
                Duly filled and self-attested Application Form (proforma given the annexures of the scheme guidelines). <br>
                Domicile Certificate                                                                       <br>                            
                Residential Proof (Voter card/ Electricity Bill/Aadhar Card)                           <br>                          
                Age Proof (Birth Certificate issued by the School last attended or Municipal authority or SHO or through Medical Board)   <br>   
                Aadhar Number                                                                                             <br>
                Bank Passbook                                                                                                <br>                 
                Ration Card                                                                                                  <br>                       
                Affidavit duly attested by Judicial Magistrate/Executive Magistrate that she/he is not in receipt of any pension/ financial assistance from any other source 
                <br></p>`;
 }
 }
        window.onload = displaySchemeDetails;
function calculateReturn() {
    var interestRate = parseFloat(document.getElementById("interestRate").value);
    var investmentAmount = parseFloat(document.getElementById("investmentAmount").value);
    var duration = parseInt(document.getElementById("duration").value);
    var totalAmount = investmentAmount;
    var interestEarned = 0;
    for (var i = 0; i < duration; i++) {
        var interest = (totalAmount * interestRate) / 100;
        totalAmount += interest;
        interestEarned += interest;
    }
    var totalInvestment = investmentAmount * duration;
    var totalReturn = totalAmount;
    document.getElementById("result").innerHTML = "Total amount after " + duration + " months: ₹" + totalReturn.toFixed(2) + "<br>";
    document.getElementById("result").innerHTML += "Interest earned: ₹" + interestEarned.toFixed(2) + "<br>";
    document.getElementById("result").innerHTML += "Total investment amount: ₹" + totalInvestment.toFixed(2);
}
