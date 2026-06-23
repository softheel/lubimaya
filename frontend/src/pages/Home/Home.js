// import React from "react";
// import { Link } from "react-router-dom";

// // import { useNavigate } from "react-router-dom";

// // images
// import scroll from '../../assets/images/scroll.png';
// import about from '../../assets/images/aboutImg.png';
// // import paper from '../../assets/images/paper.png';



// import Whatsapp from '../../assets/images/WhatsappLight.svg';
// import Instagram from '../../assets/images/InstagramLight.svg';

// // components
// import BasicBtn from "../../Components/BtnLarge/BtnLarge";
// // css
// import './Home.css';


// export default function Home() {
//     return (
//         <div className="home">
//             <div className="bg" >
//                 <h1>Частная сыроварня в Щёлково</h1>
//                 <p>Натуральный фермерский сыр 
//                 по голландской технологии</p>
//                 <p className="bannerText">~ Since 2015</p>
//                 <Link to="/catalog">
//                     <BasicBtn className="bannerBtn">В КАТАЛОГ</BasicBtn>
//                 </Link>
//                 <a href="#about"><img className="scroll" src={scroll} alt="scroll" /></a>
//             </div>

//             <div className="about section row" id="about">
//                 <div className="col-lg-6 col-sm-12">
//                     <img alt="aboutImg" className="aboutImg" src={about} />
//                 </div>
//                 <div className="content col-lg-6 col-sm-12 text-start">
//                     <h2 className="">О сыроварне</h2>
//                     <p className="text16">
//                         Все начиналось с того, что я и мои напарники, работали на молочном заводе. Мы влюбились в это дело, и уже 30 лет связаны с производством сыров.
//                         Знаем самые секретные технологии изготовления, поэтому наш сыр отличается изысканным вкусом!<br></br><br></br>

//                         На нашей сыроварне мы используем коровье молоко только высшего сорта от племенных коров галштино-фризской породы.<br></br><br></br>

//                         Важно заметить, что при производстве сыра <u>не используется</u> пальмовое масло и др. жиры растительного происхождения.<br></br>
//                     </p>
//                     <Link to="/catalog">
//                         <BasicBtn className="basic-btn">Перейти в каталог товаров</BasicBtn>
//                     </Link>
//                 </div>
//             </div>

//             <div id="contacts" className="contacts section row pt-5">
//                 <div className="col-lg-6 col-sm-12 text-start">
//                     <h2>Контакты</h2>
//                     <p className="text16">
//                         АДРЕС СЫРОВАРНИ:<br></br>
//                         Московская область, Щёлково, Любимая 61<br></br>
//                         Можно добраться на машине.
//                     </p>
//                     <p className="text16">
//                         ЧАСЫ РАБОТЫ:<br></br>
//                         пн-вс: 9:00 - 19:00
//                     </p>
//                     <p className="text16">
//                         СВЯЗАТЬСЯ С НАМИ:
//                     </p>

//                     <div className="contact-item">
//                         <button className="navLink" onClick={() => window.open('https://wa.me/your-number', '_blank')}>
//                             <img src={Whatsapp} alt="Whatsapp" />
//                         </button>
//                         <p className="text16">+7(926)210-66-39</p>
//                     </div>

//                     <div className="contact-item">
//                         <button className="navLink" onClick={() => window.open('https://instagram.com/your-profile', '_blank')}>
//                             <img src={Instagram} alt="Instagram" />
//                         </button>
//                         <p className="text16">cheese_farm</p>
//                     </div>

//                 </div>
//                 <div className="col-lg-6 col-sm-12">
//                     <iframe
//                         className="map-iframe"
//                         src="https://www.google.com/maps?q=Московская+область,+Щёлково,+Любимая+61&output=embed"
//                         width="100%"
//                         height="450"
//                         style={{ border: 0 }}
//                         allowFullScreen=""
//                         loading="lazy"
//                         referrerPolicy="no-referrer-when-downgrade"
//                         title="Карта расположения сыроварни"
//                     ></iframe>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from "react";
import { Link } from "react-router-dom";

// images
import scroll from '../../assets/images/scroll.png';
import about from '../../assets/images/aboutImg.png';
import Whatsapp from '../../assets/images/WhatsappLight.svg';
import Instagram from '../../assets/images/InstagramLight.svg';

// components
import BasicBtn from "../../Components/BtnLarge/BtnLarge";
// css
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            {/* Баннер */}
            <div className="bg">
                <div className="banner-content">
                    <h1>Частная сыроварня в Щёлково</h1>
                    <p>Натуральный фермерский сыр по голландской технологии</p>
                    <p className="bannerText">~ Since 2015</p>
                    <Link to="/catalog">
                        <BasicBtn className="bannerBtn">В КАТАЛОГ</BasicBtn>
                    </Link>
                </div>
                <a href="#about" className="scroll-link">
                    <img className="scroll" src={scroll} alt="scroll" />
                </a>
            </div>

            {/* Секция "О сыроварне" */}
            <div className="about section" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                            <img alt="aboutImg" className="aboutImg" src={about} />
                        </div>
                        <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-between">
                            <div>
                                <h2>О сыроварне</h2>
                                <p className="text16">
                                    Все начиналось с того, что я и мои напарники, работали на молочном заводе. Мы влюбились в это дело, и уже 30 лет связаны с производством сыров.
                                    Знаем самые секретные технологии изготовления, поэтому наш сыр отличается изысканным вкусом!<br /><br />

                                    На нашей сыроварне мы используем коровье молоко только высшего сорта от племенных коров галштино-фризской породы.<br /><br />

                                    Важно заметить, что при производстве сыра <u>не используется</u> пальмовое масло и др. жиры растительного происхождения.<br />
                                </p>
                            </div>
                            <div className="text-lg-start text-center mt-4">
                                <Link to="/catalog">
                                    <BasicBtn className="basic-btn">Перейти в каталог товаров</BasicBtn>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Секция "Контакты" */}
            <div id="contacts" className="contacts section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                            <h2>Контакты</h2>
                            <p className="text16 mb-3">
                                АДРЕС СЫРОВАРНИ:<br />
                                Московская область, Щёлково, Любимая 61<br />
                                Можно добраться на машине.
                            </p>
                            <p className="text16 mb-3">
                                ЧАСЫ РАБОТЫ:<br />
                                пн-вс: 9:00 - 19:00
                            </p>
                            <p className="text16 mb-3">
                                СВЯЗАТЬСЯ С НАМИ:
                            </p>

                            <div className="contact-item mb-3">
                                <button className="navLink" onClick={() => window.open('https://wa.me/your-number', '_blank')}>
                                    <img src={Whatsapp} alt="Whatsapp" />
                                </button>
                                <p className="text16 ms-3">+7(926)210-66-39</p>
                            </div>

                            <div className="contact-item mb-3">
                                <button className="navLink" onClick={() => window.open('https://instagram.com/your-profile', '_blank')}>
                                    <img src={Instagram} alt="Instagram" />
                                </button>
                                <p className="text16 ms-3">cheese_farm</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <iframe
                                className="map-iframe"
                                src="https://yandex.ru/map-widget/v1/?ll=38.074189%2C55.932314&mode=search&oid=212071077103&ol=biz&z=16.19"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Карта расположения сыроварни"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}