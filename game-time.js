module.exports = ({
	socket: 		 				false, // Сокет для общения с клиентом
	refresh: 		 				false, // № Таймера скорости времени
	startTime: 		 			86400,// 86400 Секунду начального времени
	nowTime: 	 	 				6416781,// Сколько прошло времени с момента запуска
	speedOfTime: 	 			1000,// Скорость течения игрового времени
	listTask:        		[],// Массив задач по игровому времени
	formatDateTime:  		'w DD-M-YY h:i:s', //Стандартный формат вывода даты
	month: 			 				['Дек','Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя'],// Название месяцов
	week: 			 				['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],// Название дней недели
	secondArr: 		 			{seconds:0,minute:60,hour:3600,day:86400,month:2592000,year:31536000},// Состав timestamp в секундах
	delimeterDay: 	 		['ночь','утро','день','вечер'],// Текстовое представление Времени суток
	reverseTimestamp: 	false,//Отсчет времени в обратную сторону
	delimeterDayIcon: 	[// Картинка Времени суток (утро, день,)
		'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512"><g transform="translate(0,512) scale(0.1,-0.1)" fill="#000000" stroke="none"><path d="M2615 5113 c-1248 -112 -2210 -1058 -2336 -2298 -14 -145 -6 -485 15 -630 130 -876 680 -1602 1486 -1961 205 -91 460 -163 707 -201 139 -21 518 -24 653 -5 496 70 907 245 1267 541 149 122 228 207 243 259 27 101 -55 212 -157 212 -15 0 -80 -13 -144 -29 -170 -43 -317 -61 -502 -61 -249 0 -434 29 -651 101 -432 144 -816 439 -1061 814 -222 339 -335 715 -335 1115 0 320 68 612 210 905 176 365 452 662 817 881 93 55 123 79 140 110 46 81 16 188 -67 231 -38 20 -56 23 -144 21 -56 -1 -119 -3 -141 -5z m194 -167 c-2 -2 -47 -29 -99 -61 -138 -84 -270 -186 -394 -305 -350 -338 -570 -755 -661 -1255 -26 -141 -31 -460 -11 -622 69 -540 336 -1040 741 -1390 557 -481 1290 -656 2005 -478 l95 23 -80 -75 c-169 -159 -399 -312 -602 -402 -433 -191 -917 -254 -1368 -176 -943 162 -1687 839 -1920 1749 -55 214 -69 338 -70 611 0 270 12 375 70 601 238 928 1015 1625 1960 1758 142 20 347 34 334 22z"/><path d="M3588 4424 c-30 -16 -30 -14 -51 -158 -36 -234 -189 -402 -386 -422 -77 -8 -112 -33 -113 -81 -1 -48 25 -81 69 -88 89 -12 170 -38 215 -66 125 -80 206 -231 224 -414 9 -102 57 -144 125 -110 35 18 49 49 49 108 0 66 27 164 66 237 70 133 192 222 328 239 57 6 73 13 93 35 25 30 29 53 12 89 -14 31 -38 42 -119 55 -92 14 -156 47 -226 117 -92 91 -138 196 -154 347 -7 71 -11 85 -35 105 -30 26 -58 28 -97 7z m190 -605 l71 -65 -50 -40 c-48 -38 -123 -125 -148 -171 -16 -31 -22 -29 -48 15 -30 52 -88 118 -144 161 l-46 38 59 47 c32 26 82 80 110 121 l51 73 37 -56 c20 -31 68 -87 108 -123z"/><path d="M4321 3302 c-24 -23 -29 -38 -34 -102 -15 -180 -158 -340 -304 -340 -53 0 -92 -37 -93 -86 0 -52 28 -76 98 -85 144 -20 247 -118 288 -274 8 -27 14 -69 14 -93 0 -85 87 -132 142 -77 20 20 26 39 32 95 18 197 155 350 314 350 45 0 82 38 82 83 0 55 -26 78 -99 88 -159 22 -270 146 -294 328 -11 91 -21 115 -54 130 -38 17 -62 13 -92 -17z m144 -478 l51 -51 -37 -32 c-21 -17 -52 -51 -70 -75 l-31 -45 -38 47 c-21 26 -51 60 -68 76 l-31 29 64 69 c36 38 65 74 65 81 0 6 10 -1 22 -18 12 -16 45 -53 73 -81z"/></g></svg>',
		'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><g transform="translate(0,100) scale(0.1,-0.1)" fill="#000000" stroke="none"><path d="M487 954 c-4 -4 -7 -30 -7 -58 l0 -51 -67 -18 c-36 -9 -67 -16 -68 -15 -1 2 -14 22 -29 46 -14 23 -30 42 -36 42 -21 0 -20 -24 5 -67 l27 -45 -49 -50 -49 -49 -47 26 c-44 25 -67 26 -67 5 0 -6 19 -22 43 -36 23 -15 43 -28 45 -29 2 -2 0 -14 -3 -28 -7 -24 -11 -26 -73 -29 -52 -2 -67 -6 -67 -18 0 -13 57 -15 455 -15 398 0 455 2 455 15 0 12 -15 16 -67 18 -62 3 -66 5 -73 29 -3 14 -5 26 -3 28 2 1 22 14 46 29 23 14 42 33 42 41 0 21 -17 19 -68 -11 l-44 -26 -50 50 -50 50 26 44 c30 51 32 68 11 68 -8 0 -27 -19 -41 -42 -15 -24 -28 -44 -29 -46 -1 -1 -32 6 -68 15 l-66 17 -3 55 c-3 50 -15 71 -31 55z m100 -169 c66 -20 127 -65 163 -122 17 -26 30 -51 30 -55 0 -4 -126 -8 -280 -8 -154 0 -280 4 -280 8 0 4 13 29 29 54 71 111 208 162 338 123z"/><path d="M594 515 c-8 -19 3 -35 26 -35 19 0 30 17 23 38 -6 17 -42 15 -49 -3z m36 -15 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z"/><path d="M44 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M104 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M164 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M804 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M864 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M924 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M460 492 c-15 -12 -24 -33 -27 -64 -5 -40 -2 -50 20 -72 45 -45 107 -24 107 37 0 36 -40 63 -69 47 -18 -9 -21 -8 -21 9 0 25 33 36 59 19 30 -18 40 1 12 23 -29 24 -52 24 -81 1z m65 -102 c0 -18 -6 -26 -23 -28 -13 -2 -25 3 -28 12 -10 26 4 48 28 44 17 -2 23 -10 23 -28z"/><path d="M175 431 c-8 -15 3 -31 21 -31 9 0 14 7 12 17 -4 20 -24 28 -33 14z"/><path d="M797 434 c-14 -14 -7 -35 11 -32 9 2 17 10 17 17 0 16 -18 25 -28 15z"/><path d="M205 350 c-8 -14 3 -30 21 -30 8 0 14 9 14 20 0 21 -24 28 -35 10z"/><path d="M760 340 c0 -15 5 -20 18 -18 9 2 17 10 17 18 0 8 -8 16 -17 18 -13 2 -18 -3 -18 -18z"/><path d="M154 319 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M814 319 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M104 289 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M864 289 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M256 281 c-7 -11 18 -33 27 -24 4 3 7 12 7 20 0 15 -26 18 -34 4z"/><path d="M710 276 c0 -8 4 -17 9 -20 11 -7 33 18 24 27 -12 12 -33 7 -33 -7z"/><path d="M322 223 c2 -10 10 -18 18 -18 8 0 16 8 18 18 2 12 -3 17 -18 17 -15 0 -20 -5 -18 -17z"/><path d="M642 223 c2 -10 10 -18 18 -18 8 0 16 8 18 18 2 12 -3 17 -18 17 -15 0 -20 -5 -18 -17z"/><path d="M402 193 c4 -21 33 -25 33 -3 0 8 -8 16 -18 18 -14 3 -18 -1 -15 -15z"/><path d="M564 199 c-8 -14 11 -33 25 -25 6 4 11 14 11 22 0 16 -26 19 -36 3z"/><path d="M484 189 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M294 179 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M674 179 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M264 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M484 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M704 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M484 69 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/></g></svg>',
		'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512"><g transform="translate(0,512) scale(0.1,-0.1)" fill="#000000" stroke="none"><path d="M2495 5106 c-41 -18 -83 -69 -90 -109 -3 -18 -5 -154 -3 -304 3 -256 4 -273 24 -299 39 -53 71 -69 134 -69 63 0 95 16 134 69 20 26 21 40 21 326 0 286 -1 300 -21 326 -11 15 -32 37 -46 47 -33 25 -113 32 -153 13z"/><path d="M4254 4464 c-17 -8 -117 -102 -222 -207 -205 -207 -213 -220 -197 -304 9 -49 69 -109 118 -118 84 -16 97 -8 304 197 106 105 199 206 208 224 62 131 -81 272 -211 208z"/><path d="M816 4410 c-42 -13 -95 -68 -107 -112 -21 -80 -6 -104 204 -317 106 -106 206 -199 224 -207 129 -56 262 71 213 203 -16 41 -376 401 -425 424 -44 20 -65 22 -109 9z"/><path d="M2415 3994 c-322 -49 -521 -130 -740 -300 -276 -214 -468 -529 -532 -877 -24 -126 -24 -388 0 -514 109 -590 570 -1051 1160 -1160 126 -24 388 -24 514 0 518 96 941 462 1107 960 55 163 70 266 70 457 0 191 -15 294 -70 457 -166 495 -591 866 -1101 959 -86 15 -348 27 -408 18z m305 -328 c364 -55 673 -278 835 -601 164 -328 164 -682 0 -1010 -170 -339 -498 -564 -886 -607 -447 -50 -900 199 -1104 607 -164 328 -164 682 0 1010 213 426 685 671 1155 601z"/><path d="M95 2706 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -116 24 -6 136 -9 314 -7 261 3 278 4 304 24 53 39 69 71 69 134 0 63 -16 95 -69 134 -26 20 -42 21 -314 23 -223 2 -294 0 -317 -11z"/><path d="M4415 2706 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -116 24 -6 136 -9 314 -7 261 3 278 4 304 24 53 39 69 71 69 134 0 63 -16 95 -69 134 -26 20 -42 21 -314 23 -223 2 -294 0 -317 -11z"/><path d="M1265 1451 c-51 -13 -65 -24 -257 -218 -157 -158 -188 -195 -197 -230 -32 -118 78 -227 194 -193 32 9 78 50 237 208 214 214 227 234 208 316 -10 45 -61 102 -99 111 -14 3 -33 7 -41 9 -8 2 -28 1 -45 -3z"/><path d="M3839 1338 c-69 -39 -97 -127 -65 -201 8 -18 101 -118 207 -224 164 -161 201 -193 237 -203 115 -30 222 77 191 193 -9 35 -41 73 -202 236 -106 106 -206 199 -224 207 -46 20 -102 17 -144 -8z"/><path d="M2495 786 c-41 -18 -83 -69 -90 -109 -3 -18 -5 -154 -3 -304 3 -256 4 -273 24 -299 39 -53 71 -69 134 -69 63 0 95 16 134 69 20 26 21 40 21 326 0 286 -1 300 -21 326 -11 15 -32 37 -46 47 -33 25 -113 32 -153 13z"/></g></svg>',
		'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><g transform="translate(0,100) scale(0.1,-0.1)" fill="#000000" stroke="none"><path d="M487 954 c-4 -4 -7 -30 -7 -58 l0 -51 -67 -18 c-36 -9 -67 -16 -68 -15 -1 2 -14 22 -29 46 -14 23 -30 42 -36 42 -21 0 -20 -23 4 -67 l26 -46 -49 -48 -48 -49 -46 26 c-70 38 -97 11 -29 -29 l37 -22 -65 -5 c-49 -4 -65 -9 -65 -20 0 -13 57 -15 455 -15 398 0 455 2 455 15 0 11 -16 16 -65 20 l-65 5 38 22 c35 21 51 53 25 53 -6 0 -31 -12 -56 -26 l-44 -26 -50 50 -50 50 26 45 c30 50 32 67 11 67 -8 0 -27 -19 -41 -42 -15 -24 -28 -44 -29 -46 -1 -1 -32 6 -68 15 l-66 17 -3 55 c-3 50 -15 71 -31 55z m101 -169 c54 -16 125 -65 150 -102 l14 -23 -252 0 -252 0 14 22 c41 62 151 117 234 118 22 0 63 -7 92 -15z"/><path d="M174 589 c-8 -14 11 -33 25 -25 16 10 13 36 -3 36 -8 0 -18 -5 -22 -11z"/><path d="M792 583 c4 -21 33 -25 33 -3 0 8 -8 16 -18 18 -14 3 -18 -1 -15 -15z"/><path d="M657 554 c-10 -10 -9 -42 2 -48 18 -11 42 6 39 28 -3 21 -28 33 -41 20z m23 -24 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z"/><path d="M512 524 c-23 -16 -30 -44 -11 -44 7 0 17 7 24 17 15 20 45 11 45 -15 0 -10 -18 -36 -40 -57 -56 -55 -53 -65 20 -65 47 0 60 3 60 15 0 11 -11 15 -36 15 l-36 0 36 40 c20 22 36 49 36 59 0 22 -35 51 -60 51 -9 0 -26 -7 -38 -16z"/><path d="M375 510 c-22 -24 -14 -36 14 -20 20 10 21 9 21 -60 0 -56 3 -70 15 -70 12 0 15 16 15 85 0 83 -1 85 -23 85 -13 0 -32 -9 -42 -20z"/><path d="M44 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M104 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M164 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M804 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M864 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M924 509 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M175 431 c-8 -15 3 -31 21 -31 9 0 14 7 12 17 -4 20 -24 28 -33 14z"/><path d="M797 434 c-14 -14 -7 -35 11 -32 9 2 17 10 17 17 0 16 -18 25 -28 15z"/><path d="M205 350 c-8 -14 3 -30 21 -30 8 0 14 9 14 20 0 21 -24 28 -35 10z"/><path d="M760 340 c0 -15 5 -20 18 -18 9 2 17 10 17 18 0 8 -8 16 -17 18 -13 2 -18 -3 -18 -18z"/><path d="M154 319 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M814 319 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M104 289 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M864 289 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M256 281 c-7 -11 18 -33 27 -24 4 3 7 12 7 20 0 15 -26 18 -34 4z"/><path d="M710 276 c0 -8 4 -17 9 -20 11 -7 33 18 24 27 -12 12 -33 7 -33 -7z"/><path d="M322 223 c2 -10 10 -18 18 -18 8 0 16 8 18 18 2 12 -3 17 -18 17 -15 0 -20 -5 -18 -17z"/><path d="M642 223 c2 -10 10 -18 18 -18 8 0 16 8 18 18 2 12 -3 17 -18 17 -15 0 -20 -5 -18 -17z"/><path d="M402 193 c4 -21 33 -25 33 -3 0 8 -8 16 -18 18 -14 3 -18 -1 -15 -15z"/><path d="M564 199 c-8 -14 11 -33 25 -25 6 4 11 14 11 22 0 16 -26 19 -36 3z"/><path d="M484 189 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M294 179 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M674 179 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M264 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M484 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M704 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/><path d="M484 69 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"/></g></svg>'
	],
	addZeroz(number, delim) {//Давление нулей перед цифрами
		return ('0' + number).slice(-delim);
	},
	init(){//Инициализация таймера времени
		(this.nowTime===0? (this.nowTime += this.startTime) : null);
		(!this.reverseTimestamp?(this.nowTime += 1):(this.nowTime -= 1));
		this.refresh = setTimeout(function(){
			this.init()
			this.loopTask()
		}.bind(this), this.speedOfTime)
			
			return this; 
	},
	setSpeedOfTime(speed){//Установить скорость течения времени
		if(parseInt(speed) === 0){
			clearTimeout(this.refresh)
			this.refresh = false
		} else if(this.refresh == false){
			this.init()
		} else if(parseInt(speed) > 0){
			this.speedOfTime = 1000 * parseInt(speed)
		} else {
			this.speedOfTime = 1000 / Math.abs(speed)
		}
	},
	setReverseTime(revers){// Установить направление отсчета времени
		if(typeof revers !== "boolean") return
		this.reverseTimestamp = revers
	},
	setDate(timestamp){// ставим стартовую дату
		this.nowTime = Math.abs(Math.floor(parseInt(timestamp)))
	},
	setFormat(format){// Установить формат отображения даты
		let result = format.match(/[Y|YY|YYY|YYYY|M|MM|D|DD|w|W|h|i|s|\,|\.|\s|\-|\:]/gm) || [];
		if(result.length>0){
			this.formatDateTime = String(result.join(''))
		}
	},
	getFormatDate(format, date=false){//Форматирование Даты по шаблону
		let result = format.match(/[Y|YY|YYY|YYYY|M|MM|D|DD|w|W|h|i|s|\,|\.|\s|\-|\:]/gm) || [],
			stringTime = ''; 

		if(result.length>0){
			const dateObj = date || this.getDateObj(),
				regDate = String(result.join('')).split(/:|-|,|\s/),
				regDeli = String(result.join('')).split(/[\w]/).filter(el => el !== null && el !== '');
				
			regDate.forEach((item, k) => {
				if(typeof regDeli[k] === 'undefined') regDeli[k] = ''
				switch(item){
					case 'Y': stringTime += dateObj.year+regDeli[k];
						break;
					case 'YY': stringTime += this.addZeroz(dateObj.year, 2)+regDeli[k];
						break;
					case 'YYY': stringTime += this.addZeroz(dateObj.year, 3)+regDeli[k];
						break;
					case 'YYYY': stringTime += this.addZeroz(dateObj.year, 4)+regDeli[k];
						break;
					case 'M': stringTime += this.month[dateObj.month % 12]+regDeli[k];
						break;
					case 'MM': stringTime += this.addZeroz(dateObj.month % 12, 2)+regDeli[k];
						break;						
					case 'D': stringTime += dateObj.day+regDeli[k];
						break;
					case 'DD': stringTime += this.addZeroz(dateObj.day, 2)+regDeli[k];
						break;
					case 'W': stringTime += dateObj.week+regDeli[k];
						break;
					case 'w': stringTime += this.week[dateObj.week]+regDeli[k];
						break;
					case 'h': stringTime += this.addZeroz(Math.floor(dateObj.hour % 24), 2)+regDeli[k];
						break;
					case 'i': stringTime += this.addZeroz(Math.floor(dateObj.minute % 60), 2)+regDeli[k];
						break;
					case 's': stringTime += this.addZeroz(dateObj.seconds, 2)+regDeli[k];
						break;
				}
			});
			return stringTime
		}		
	},
	getDateAfterStart(){//Возвращает объект прошедшего времени с момента отсчета
		return this.getDateObj(this.nowTime)
	},
	getDateObj(timestamp=false){// Объект даты
		const stamp = timestamp || this.nowTime
			seconds = stamp % 60, 
			minute  = Math.floor(stamp / 60),
			hour 	= Math.floor(minute / 60), 
			days	= Math.floor(hour / 24) % 30===0?30:Math.floor(hour / 24) % 30,
			week	= Math.floor(Math.floor(hour / 24) % 7),
			month	= Math.ceil(Math.floor(stamp / this.secondArr.day) / 30 % 12),////
			year	= Math.floor(month / 12);

		if(!!timestamp)
			return {
				year:    Math.floor(timestamp / this.secondArr.year), 
				month: 	 Math.floor(timestamp / this.secondArr.month),
				week:    Math.floor(timestamp / 604800),
				day:     Math.floor(timestamp / this.secondArr.day),
				hour:    Math.floor(timestamp / this.secondArr.hour),
				minute:  Math.floor(timestamp / this.secondArr.minute),
				seconds: stamp
			}

		return {year, month, week, day:days, hour, minute, seconds}
	},
	dateParse(stringTime, nowtime=false){//Преобразование из строки YY-MM-DD h:i:s в timestamp
		const arrTime = stringTime.match(/[0-9]{1,4}/gm) || [],
			seconds = Object.values(this.secondArr).reverse();
		if(!nowtime){
			return arrTime.map((i, k)=>x+=(parseInt(i)*seconds[k]),x=0).reverse()[0]	
		}
		return arrTime
	},
	loopTask(){//Цикл проверки задач
		if(this.listTask.length > 0)
			this.listTask.forEach((task, key) => {
				let endTime = task.end
				if(typeof task.end === 'string' && !task.event){
					endTime = this.dateParse(task.end);
				}

				if(endTime === this.nowTime && !task.event){
					this.listTask.splice(key, 1)
					this.setTaskSocket(task)
				}

				if(typeof task.end === 'string' && task.event){
					endTime = this.dateParse(task.end, 'nowtime'),
						arrEndTime = this.getDateObj();
					
					if(parseInt(endTime[0]) === arrEndTime.hour /*houer*/ && 
						parseInt(endTime[1]) === arrEndTime.minute/*minutes*/ && 
						parseInt(endTime[2]) === arrEndTime.seconds){/*seconds*/
						endTime = this.nowTime
					}
				}

				if(task.event && endTime === this.nowTime){
					this.setTaskSocket(task)
				}
			})
	},
	setTask(task){//Постановка на выполнение задач
		if(typeof task === 'object'){
			if(task?.end){
				task.start = !task?.start?this.nowTime:task.start
				task.event = !task?.event?false:task.event

				this.listTask.push(task)
			} else {
				this.setTaskSocket({action: 'нет даты окончания события'})
			}
		}
	},
	setTaskSocket(task){//Передаем активную задачу в сокет
		if(this.socket)
			this.socket.emit('getTask', task)

		return task
	},
	delimDay(){// Деление суток на (утро, день, вечер, ночь)
		const nowHour  = Math.floor(this.getDateObj().hour % 24);
		// ночь: с 0 до 6, утро: c 6 до 12, день: с 12 до 18, вечер: с 18 до 0
		if(nowHour>=0 && nowHour<6)
			return {string: this.delimeterDay[0], icon: this.delimeterDayIcon[0]}
		if(nowHour>=6 && nowHour<12)
			return {string: this.delimeterDay[1], icon: this.delimeterDayIcon[1]}
		if(nowHour>=12 && nowHour<18)
			return {string: this.delimeterDay[2], icon: this.delimeterDayIcon[2]}
		if(nowHour>=18 && nowHour<24)
			return {string: this.delimeterDay[3], icon: this.delimeterDayIcon[3]}
	},
	getTime() {// Вывод значения Даты
		return {
			timestamp: this.nowTime,
			dateStrung: this.getFormatDate(this.formatDateTime),
			dataObj: this.getDateObj(),
			delimDay: this.delimDay()
		}
	}
})//.init();