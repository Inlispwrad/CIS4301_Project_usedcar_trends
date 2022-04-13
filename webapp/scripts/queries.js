const oracledb = require("oracledb");

async function AvgPriceMileageRatio() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "jinlin",
      password: "MUQt2jqlHuJSBhjxkdNVRZJD",
      connectionString: "oracle.cise.ufl.edu/orcl",
    });

    console.log("Successfully connected");

    result = await connection.execute(
      `WITH
      carset
      AS(
      SELECT * FROM sell_list NATURAL JOIN used_car
      )
      SELECT year, ROUND(AVG(mileage/price),6)  AS ratio FROM carset
      WHERE year IS NOT NULL
      GROUP BY year
      ORDER BY year ASC
      `,
      [],
      { resultSet: false, outFormat: oracledb.OUT_FORMAT_ARRAY }
    );

    const rs = result.resultSet;

    return rs;

    // while ((row = await rs.getRow())) {
    //   console.log(row.YEAR, " ", row.RATIO);
    // }
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function PriceByPostingDate() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "jinlin",
      password: "MUQt2jqlHuJSBhjxkdNVRZJD",
      connectionString: "oracle.cise.ufl.edu/orcl",
    });

    console.log("Successfully connected");

    result = await connection.execute(
      `SELECT postdate, ROUND(AVG(price),0) AS priceAvg
      FROM sell_list
      WHERE postdate IS NOT NULL
      GROUP BY postdate
      ORDER BY postdate ASC
      `,
      [],
      { resultSet: false, outFormat: oracledb.OUT_FORMAT_ARRAY }
    );

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function CarPriceDepreciation() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "jinlin",
      password: "MUQt2jqlHuJSBhjxkdNVRZJD",
      connectionString: "oracle.cise.ufl.edu/orcl",
    });

    console.log("Successfully connected");

    result = await connection.execute(
      `WITH
      carset
      AS(
      SELECT * FROM sell_list NATURAL JOIN used_car
      )
      SELECT year, ROUND(AVG(price),0) AS avgPrice FROM carset
      WHERE year IS NOT NULL AND (model = 'Some Type' OR brand_name = 'Toyota') /* Text Field - input conditions, case sensitives */
      GROUP BY year
      ORDER BY year ASC
      `,
      [],
      { resultSet: false, outFormat: oracledb.OUT_FORMAT_ARRAY }
    );

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function PriceTrendBetweenRegions() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "jinlin",
      password: "MUQt2jqlHuJSBhjxkdNVRZJD",
      connectionString: "oracle.cise.ufl.edu/orcl",
    });

    console.log("Successfully connected");

    result = await connection.execute(
      `WITH
      carset
      AS(
      SELECT * FROM sell_list NATURAL JOIN sell_location NATURAL JOIN used_car
      )
      SELECT state_a.year,
                  avgPrice_a,
                  avgPrice_b
      FROM 
          (SELECT carset.year, ROUND(AVG(price), 0) as avgprice_a FROM carset WHERE (state = LOWER('fl') OR region = '') /* Text Field - state_A, used for input condition of trend query, region is case sensitive */ 
          group by carset.year) state_a
          FULL OUTER JOIN 
           (SELECT carset.year, ROUND(AVG(price), 0) as avgprice_b FROM carset WHERE (state = LOWER('ca') OR region = '')  /* Text Field - state_B, used for input condition of trend query, region is case sensitive */ 
           group by carset.year) state_b
           ON state_a.year = state_b.year
      WHERE state_a.year IS NOT NULL
      GROUP BY state_a.year, avgPrice_a, avgPrice_b
      ORDER BY state_a.year ASC
      `,
      [],
      { resultSet: false, outFormat: oracledb.OUT_FORMAT_ARRAY }
    );

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function BrandPriceTrend() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "jinlin",
      password: "MUQt2jqlHuJSBhjxkdNVRZJD",
      connectionString: "oracle.cise.ufl.edu/orcl",
    });

    console.log("Successfully connected");

    result = await connection.execute(
      `SELECT year, ROUND(AVG(price), 0) FROM sell_list
      INNER JOIN used_car ON sell_list.VIN = used_car.VIN
      WHERE used_car.brand_name = 'BMW' /* Text Field - used for the input condition of trend query */
      GROUP BY year
      ORDER BY year ASC
      `,
      [],
      { resultSet: false, outFormat: oracledb.OUT_FORMAT_ARRAY }
    );

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
