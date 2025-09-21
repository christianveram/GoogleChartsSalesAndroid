# GoogleChartsSalesAndroid
Repositorio para el modulo de Google Charts de la materia Presentación y Visualización de datos.

Nombres : Christian Vera, Julián Castiblanco.


Se presenta la documentación del dashboard creado mediante datos reales de descargas y ventas de videojuegos Android,  enfocado en ventas, instalaciones, ratings y comportamiento por categoría y región.

Las visualizaciones buscan responder una pregunta de negocio y fueron creadas mediante **Google Charts API**, los datos provienen de una hoja de calculo de google y se crearon las columnas : "US_Sales","EU_sales","JP_sales","Global_sales", "User_rating" y "Critic_Rating"

Columnas
A: title
B: rank
C: total_ratings
D: installs
E: average_rating
F: growth (30 days)
G: growth (60 days)
H: price
I: category
J: 5_star_ratings
K: 4_star_ratings
L: 3_star_ratings
M: 2_star_ratings
N: 1_star_ratings
O: paid
P: US_Sales
Q: EU_Sales
R: JP_Sales
S: Global_Sales
T: User_rating
U: Critic_Ratingç

## Gráfico 1: Distribución de ratings por categoría (%)

Se agruparon los ratings por categoría, luego se calculó los porcentajes y, finalmente, se creó una visualización de barras apiladas horizontales, con el objetivo de identificar que categorías tienen clasificaciones más polarizadas y, por tanto, pueden resultar en una oportunidad de negocio para realizar posibles inversiones.
\\
* Consulta: SELECT I, SUM(J), SUM(K), SUM(L), SUM(M), SUM(N) GROUP BY I

## Grafico 2: Número de instalaciones por categoría

Se presenta la cantidad de instalaciones por categória con el objetivo de identificar las categórias mas populares en términos de descargas, lo cual sirve para apreciar las catégorias mas populares y cuales son más de nicho, información relevante para el desarrollo de nuevos videojuegos.
\\
* Consulta: SELECT I, SUM(D) GROUP BY I ORDER BY SUM(D) DESC

## Grafico 3: Ventas por region.

Se realiza un grafico de pastel con la cantidad de ventas de cada región, con el objetivo de identificar que regiones son mas relevantes para la venta de videojuegos, lo cual es util para determinar el presupuesto para estrategias de marketing. 
\\
* Consulta: SELECT SUM(P), SUM(Q), SUM(R)

## Gráfico 4: Contribución regional por categoría 

Mediante un gráfico de área apilada se visualiza las contribución de cada región en cada categória, lo cual es de relevancia para conocer las regiones donde sería viable desarrollar un videojuego, como por ejemplo los juegos de rol en Japón.
\\
* Consulta: SELECT I, SUM(P), SUM(Q), SUM(R) GROUP BY I

## Grafico 5: Top 10 juegos mejor rankeados por categoría

Mediante un grafico de barras se elige una categoría y se muestra el top 10 de juegos mas descargados de esa categoría, mediante el cual se puede identificar que juegos son referentes en cada una de las categórias e identificar las prácticas que los posicionan líderes.\\

* Consulta: SELECT I, A, B, D WHERE B IS NOT NULL AND I != "" AND D IS NOT NULL

## Gráfico 6: Crítica de usuarios y medios.

Se crea un gráfico de barras apiladas para evidenciar las diferencias entre las críticas de usuarios y medios en distintas categorías, esto con el objetivo de identificar sectores donde lás crítícas sean dispares e indiquen una posible oportunidad de negocio en sectores donde el promedio de críticas de usuarios o medios sea baja.

* Consulta: SELECT I, AVG(T), AVG(U) GROUP BY I ORDER BY AVG(T) DESC
