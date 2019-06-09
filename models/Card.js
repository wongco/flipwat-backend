const db = require("../db");
const { MAX_PHRASE_LIMIT } = require("../config");

/** Card DB Model */
class Card {
  /**
   * @description - gets list of cards from the database - latest to oldest
   * @property {number} limit - numer of items to limit to
   * @property {number} page - pagination option
   * @return {Promise <[ { id, text, createdat }, ... ]>}
   */
  static async getCards({ page = 0, limit = MAX_PHRASE_LIMIT }) {
    const result = await db.query(
      "SELECT * FROM cards ORDER BY createdat DESC OFFSET $1 LIMIT $2",
      [page, limit]
    );

    return result.rows;
  }

  /**
   * @description - gets list of cards from the database - latest to oldest
   * @property {number} limit - numer of items to limit to
   * @property {number} page - pagination option
   * @return {Promise <{ id, text, createdat }>}
   */
  static async getRandomCard() {
    const result = await db.query(
      "SELECT * FROM cards ORDER BY RANDOM() LIMIT 1"
    );
    if (result.length === 0) {
      throw new Error("No entries exist in the database!");
    }
    return result.rows[0];
  }

  /**
   * @description - gets specific card from the database
   * @property {number} id - id number of card
   * @return {Promise <{ id, text, createdat }>}
   */
  static async getCard(id) {
    const result = await db.query("SELECT * FROM cards WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      throw new Error("Could not find specified id");
    }
    return result.rows[0];
  }
}

module.exports = Card;
