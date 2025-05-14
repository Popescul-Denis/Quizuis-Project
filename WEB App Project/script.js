const quizes_container = document.getElementById("quizes_container");
const quizes = quizes_container.querySelectorAll(".quiz_container");

quizes.forEach((quiz,id) => {
  const quizId = quiz.querySelector(".ids");
  let stringB="#";
  if(id<10) stringB="#00";
  else if(id<100) stringB="#0";
  else stringB="#";
  id++;
  quizId.textContent=stringB+id;

  const nume = quiz.querySelector(".nume");
  nume.addEventListener("click", () => {
    const numeWeb = quiz.id;
    const pageUrl = `${numeWeb}.html`;

    fetch(pageUrl, {method: "HEAD"}).then((response) => {
      if(response.ok){
        window.location.href=pageUrl;
      }
      else{
        alert(`Pagina "${numeWeb}" nu a fost inca creata`);
      }
    }).catch(()=>{
      alert(`Pagina "${numeWeb}" nu a fost inca creata`);
    });
  })
});
