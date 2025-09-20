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

# Gráfico 1: Distribución de ratings por categoría (%)

Se agruparon los ratings por categoría, luego se calculó los porcentajes y se creo una visualización de barras apiladas horizontales con el objetivo de identificar que categórias tienen clasificaciones mas polarizadas y pueden resultar una oportunidad de negocio para realizar posibles inversiones.
\\
* Consulta: SELECT I, SUM(J), SUM(K), SUM(L), SUM(M), SUM(N) GROUP BY I

# Grafico 2: Número de instalaciones por categoría

Se presenta la cantidad de instalaciones por categória con el objetivo de identificar las categórias mas populares en términos de descargas, lo cual sirve para apreciar las catégorias mas populares y cuales son más de nicho, información relevante para el desarrollo de nuevos videojuegos.
\\
* Consulta: SELECT I, SUM(D) GROUP BY I ORDER BY SUM(D) DESC

# Grafico 3: Ventas por region.

Se realiza un grafico de pastel con la cantidad de ventas de cada región, con el objetivo de identificar que regiones son mas relevantes para la venta de videojuegos 