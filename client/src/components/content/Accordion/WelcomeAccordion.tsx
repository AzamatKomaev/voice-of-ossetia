import React from 'react';

const WelcomeAccordion = () => {
  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
              <b>Добро пожаловать!</b>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
               data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Здравствуйте! Создатель данного веб-сайта искренне рад видеть вас!
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <b>Для чего нужен этот сайт?</b>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
               data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Ответ прост: наша задача - обсуждение накипевших проблем и хранение жалоб.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <b>Каких жалоб?</b>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
               data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Жалобы могут быть различны: начиная от инфаструктуры вашего поселения и заканчивая
              приобретением некачественного товара в магазине или обнаружением водителя, нарушающего ПДД.
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFour">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <b>Допустим, обнаружил(-а). Что дальше?</b>
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
             data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Наш сайт не является проектом ГИБДД или администраций.
            Проект призван выполнять роль социальной сети, где каждый может высказаться, обсудить проблему с горожанами,
            собирать информацию о нарушениях или нарушителях (в соответствии с законодательством РФ).
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFive">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            <b>Но кто мы такие, чтобы на нас обратили внимание?</b>
          </button>
        </h2>
        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive"
             data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Напомним, что по Конституций РФ:<br/>
            - <u> "Носителем суверенитета и единственным источником власти в Российской Федерации является ее многонациональный народ"</u>.<br/>
            Давайте добавим еще одну статью:<br/> - <u>"Каждому гарантируется свобода мысли и слова."</u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAccordion;