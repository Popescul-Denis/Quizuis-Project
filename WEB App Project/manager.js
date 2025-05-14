const quizData = {
  "mate1" : [
    {corect: 3}, //1
    {corect: 4}, //2
    {corect: 1}, //3
    {corect: 1}, //4
    {corect: 2}, //5
    {corect: 3}, //6
    {corect: 4}, //7
    {corect: 2}, //8
    {corect: 1}, //9
    {corect: 3}, //10
  ]
}

const nrQuestions = {
  "mate1" : 10,
  "steag1" : 12,
}

const intrebari = document.getElementById("intrebari");
const sir_intrebari = intrebari.querySelectorAll(".question_container");
const path=window.location.pathname;
const pageName = path.split("/").pop();
const quizId = pageName.replace(".html","");

const feedback_final = document.querySelector(".feedback_final");
const buton_final = document.querySelector(".buton_final");

let corecte = 0;
console.log(quizId);

sir_intrebari.forEach((question, i) => {
  const type = question.id;
  if(type === "choice"){
    const variante = question.querySelector(".variante");
    const buttons = variante.querySelectorAll(".alegere");
    const verifButton = variante.querySelector(".check");


    buttons.forEach((btn)=>{
      btn.addEventListener("click", ()=>{
        buttons.forEach((b)=> {b.classList.remove("selected");});

        btn.classList.add("selected");
      })
    })

    verifButton.addEventListener("click", ()=>{
      const selectat = question.querySelector(".alegere.selected");

      if(!selectat){
        alert("Trebuie sa selectezi un raspuns!");
        return;
      }

      const valoare_selectata = parseInt(selectat.getAttribute("data-valoare"));
      const raspuns_corect = quizData[quizId][i].corect;

      if(valoare_selectata === raspuns_corect){
        corecte++;
        const text_bun = question.querySelector(".feedback_bun");
        text_bun.classList.add("vizibil");
        selectat.classList.remove("selected");
        selectat.classList.add("complet");
      }else{
        const text_rau = question.querySelector(".feedback_rau");
        text_rau.classList.add("vizibil");
        selectat.classList.remove("selected");
        selectat.classList.add("incomplet");
        buttons.forEach((b) => {
          if (parseInt(b.getAttribute("data-valoare")) === raspuns_corect) {
            b.classList.add("complet");
          }
        });
      }

      buttons.forEach((b)=>{
        b.disabled=true;
        b.classList.add("disabled");
      });
      verifButton.disabled=true;

      if(i+1<sir_intrebari.length){
        setTimeout(() => {
          sir_intrebari[i+1].style.display="block";
        }, 500);
      }else{
        feedback_final.textContent = `Felicitari! Ai raspuns corect la ${corecte}/${nrQuestions[quizId]}`;
        feedback_final.style.display = "block";
        buton_final.style.display = "block";
        buton_final.addEventListener("click", () => {
          window.location.href = "index.html";
        })
      }
    });
  }
})
