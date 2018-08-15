// Import node modules
import indicative from 'indicative'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'

// Import models
import User from '../models/User'
import Post from '../models/Post'

export default class PostController {
  /**
   * Method for creating a new post
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async create(ctx, next) {
    const currUser = ctx.state.user
    const postInfo = ctx.request.body

    // Check permissions
    if (currUser.id !== postInfo.user_id && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, 'You are not authorized to do this')
    }

    // Find user by ID
    const user = await User.find(postInfo.user_id)
    if (!user) {
      return SendError(ctx, 400, 'No user with specified ID')
    }

    // Validate post info
    await Post.validate({
      rules: Post.rules,
      fields: postInfo
    })

    // Create post
    const post = await Post.create(postInfo)
    if (!post) {
      return SendError(ctx, 400, 'Failed to create post!', post)
    }

    // Sanitize post info
    const outputPost = Helpers.transformObj(
      post.attributes, ['id', 'title', 'body', 'user_id']
    )

    // Send response
    ctx.body = JRes.success('Successfully created post!', {
      post: outputPost
    })
  }
}
