import Bookshelf from '../config/Bookshelf'

class Post extends Bookshelf.Model {
  get tableName() { return 'posts' }
  get uuid() { return true }
  get hasTimestamps() { return true }

  static get rules() {
    return {
      title: 'required|min:1|max:20',
      body: 'min:0|max:250',
      user_id: 'required'
    }
  }

  user() {
    return this.belongsTo('User')
  }

  /**
   * Create a post
   * @param info - Information to create a post
   */
  static async create(info) {
    return await (new Post(info)).save()
  }

  /**
   * Find posts by post ID
   * @param postOD - Post identifier
   * @param opts - Options for the fetch
   */
  static async find(postId, opts = {}) {
    return await Post.where('id', postId).fetch(opts)
  }

  /**
   * Update a post
   * @param profile - Post model to update
   * @param info - Information to update with
   */
  static async update(post, info) {
    return await post.save(info)
  }

  /**
   * Delete a post
   * @param post - Post to delete
   */
  static async delete(post) {
    return await post.destroy()
  }
}

export default Bookshelf.model('Post', Post)
