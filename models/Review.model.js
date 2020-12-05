const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title for review'],
      maxlength: 100,
    },
    text: {
      type: String,
      required: [true, 'Please add the review text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, 'Please add a rating between 1 and 10'],
    },
    bootcamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bootcamp',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bootcamp',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per bootcamp
reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method for calculating average rating
reviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Calculate average cost of bootcamp after save
reviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp);
});

// Calculate average cost of bootcamp before remove
reviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', reviewSchema);
