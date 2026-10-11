import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Production Ready'
  },
  badge: {
    type: String,
    default: 'Full-Stack'
  },
  badgeType: {
    type: String,
    default: 'default'
  },
  description: {
    type: String,
    required: true
  },
  highlights: [{
    title: String,
    text: String
  }],
  techStack: [String],
  image: String,
  githubUrl: String,
  liveUrl: String,
  architecturePoints: [String]
});

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
