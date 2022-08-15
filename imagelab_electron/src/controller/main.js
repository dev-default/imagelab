const PROCESS_OPERATIONS = require("../../operations");
const ReadImage = require("../operator/basic/ReadImage");
const WriteImage = require("../operator/basic/WriteImage");
const Blur = require("../operator/blurring/Blur");
const GaussianBlur = require("../operator/blurring/GaussianBlur");
const MedianBlur = require("../operator/blurring/MedianBlur");
const DrawArrowLine = require("../operator/drawing/DrawArrowLine");
const DrawCircle = require("../operator/drawing/DrawCircle");
const DrawEllipse = require("../operator/drawing/DrawEllipse");
const DrawLine = require("../operator/drawing/DrawLine");
const DrawRectangle = require("../operator/drawing/DrawRectangle");
const DrawText = require("../operator/drawing/DrawText");
const BilateralFilter = require("../operator/filtering/BilateralFilter");
const BoxFilter = require("../operator/filtering/BoxFilter");
const Dilation = require("../operator/filtering/Dilation");
const Erosion = require("../operator/filtering/Erosion");
const Morphological = require("../operator/filtering/Morphological");
const PyramidDown = require("../operator/filtering/PyramidDown");
const PyramidUp = require("../operator/filtering/PyramidUp");
const AffineImage = require("../operator/geometric/AffineImage");
const ReflectImage = require("../operator/geometric/ReflectImage");
const RotateImage = require("../operator/geometric/RotateImage");
const ScaleImage = require("../operator/geometric/ScaleImage");

class MainController {
  // This private field is used to store the applied operators in the workspace
  #appliedOperators;

  // This holds the original image added by the user
  #originalImage;

  // This holds the proccessed image by the opencv operators
  #processedImage;

  constructor() {
    this.#appliedOperators = [];
    this.#originalImage = null;
    this.#processedImage = null;
  }

  /**
   * This function is responsible for making the blocks in order
   * according to the order in the workspace
   * @param {String} parent
   * @param {String} child
   * @returns none
   */
  arrangeBlocks(parent, child) {
    const parentIndex = this.#appliedOperators.findIndex(
      (item) => item.type === parent
    );
    const childIndex = this.#appliedOperators.findIndex(
      (item) => item.type === child
    );

    // If the parent is not found then the index will be -1
    // If the child is not found then the index will be -1
    if (parentIndex === -1 || childIndex === -1) {
      return;
    }

    // If the child is next to the parent then we do need to done anything
    if (parentIndex + 1 === childIndex) {
      return;
    }

    const childElement = this.#appliedOperators[childIndex];
    this.#appliedOperators.splice(childIndex, 1);
    this.#appliedOperators.splice(parentIndex + 1, 0, childElement);
  }

  /**
   * This method set the original image
   * @param {Mat Image} image
   */
  setOriginalImage(image) {
    this.#originalImage = image;
  }

  /**
   * This methods returns the original image
   * @returns Image
   */
  getOriginalImage() {
    return this.#originalImage;
  }

  /**
   * This function generates the operator object accroding to the string passed
   * @param {String} operatorType
   * @returns
   */
  addOperator(operatorType) {
    switch (operatorType) {
      case PROCESS_OPERATIONS.READIMAGE:
        this.#appliedOperators.push(
          new ReadImage(PROCESS_OPERATIONS.READIMAGE)
        );
        break;
      case PROCESS_OPERATIONS.WRITEIMAGE:
        this.#appliedOperators.push(
          new WriteImage(PROCESS_OPERATIONS.WRITEIMAGE)
        );
        break;
      case PROCESS_OPERATIONS.REFLECTIMAGE:
        this.#appliedOperators.push(
          new ReflectImage(PROCESS_OPERATIONS.REFLECTIMAGE)
        );
        break;
      case PROCESS_OPERATIONS.ROTATEIMAGE:
        this.#appliedOperators.push(
          new RotateImage(PROCESS_OPERATIONS.ROTATEIMAGE)
        );
        break;
      case PROCESS_OPERATIONS.AFFINEIMAGE:
        this.#appliedOperators.push(
          new AffineImage(PROCESS_OPERATIONS.AFFINEIMAGE)
        );
        break;
      case PROCESS_OPERATIONS.SCALEIMAGE:
        this.#appliedOperators.push(
          new ScaleImage(PROCESS_OPERATIONS.SCALEIMAGE)
        );
        break;
      case PROCESS_OPERATIONS.DRAWLINE:
        this.#appliedOperators.push(new DrawLine(PROCESS_OPERATIONS.DRAWLINE));
        break;
      case PROCESS_OPERATIONS.DRAWELLIPSE:
        this.#appliedOperators.push(
          new DrawEllipse(PROCESS_OPERATIONS.DRAWELLIPSE)
        );
        break;
      case PROCESS_OPERATIONS.DRAWARROWLINE:
        this.#appliedOperators.push(
          new DrawArrowLine(PROCESS_OPERATIONS.DRAWARROWLINE)
        );
        break;
      case PROCESS_OPERATIONS.DRAWTEXT:
        this.#appliedOperators.push(new DrawText(PROCESS_OPERATIONS.DRAWTEXT));
        break;
      case PROCESS_OPERATIONS.DRAWCIRCLE:
        this.#appliedOperators.push(
          new DrawCircle(PROCESS_OPERATIONS.DRAWCIRCLE)
        );
        break;
      case PROCESS_OPERATIONS.DRAWRECTANGLE:
        this.#appliedOperators.push(
          new DrawRectangle(PROCESS_OPERATIONS.DRAWRECTANGLE)
        );
        break;
      case PROCESS_OPERATIONS.BLURIMAGE:
        this.#appliedOperators.push(new Blur(PROCESS_OPERATIONS.BLURIMAGE));
        break;
      case PROCESS_OPERATIONS.GAUSSIANBLUR:
        this.#appliedOperators.push(
          new GaussianBlur(PROCESS_OPERATIONS.GAUSSIANBLUR)
        );
        break;
      case PROCESS_OPERATIONS.MEDIANBLUR:
        this.#appliedOperators.push(
          new MedianBlur(PROCESS_OPERATIONS.MEDIANBLUR)
        );
        break;
      case PROCESS_OPERATIONS.BILATERALFILTER:
        this.#appliedOperators.push(
          new BilateralFilter(PROCESS_OPERATIONS.BILATERALFILTER)
        );
        break;
      case PROCESS_OPERATIONS.BOXFILTER:
        this.#appliedOperators.push(
          new BoxFilter(PROCESS_OPERATIONS.BOXFILTER)
        );
        break;
      case PROCESS_OPERATIONS.PYRAMIDUP:
        this.#appliedOperators.push(
          new PyramidUp(PROCESS_OPERATIONS.PYRAMIDUP)
        );
        break;
      case PROCESS_OPERATIONS.PYRAMIDDOWN:
        this.#appliedOperators.push(
          new PyramidDown(PROCESS_OPERATIONS.PYRAMIDDOWN)
        );
        break;
      case PROCESS_OPERATIONS.EROSION:
        this.#appliedOperators.push(new Erosion(PROCESS_OPERATIONS.EROSION));
        break;
      case PROCESS_OPERATIONS.DILATION:
        this.#appliedOperators.push(new Dilation(PROCESS_OPERATIONS.DILATION));
        break;
      case PROCESS_OPERATIONS.MORPHOLOGICAL:
        this.#appliedOperators.push(
          new Morphological(PROCESS_OPERATIONS.MORPHOLOGICAL)
        );
        break;
      default:
        break;
    }
  }

  /**
   * This method compute and generate the output of the selected operators
   */
  computeAll() {
    if (this.#appliedOperators.length === 0) {
      throw Error("No operators are added to the workspace");
    }

    if (this.#appliedOperators[0]?.type !== PROCESS_OPERATIONS.READIMAGE) {
      throw Error("Read Image block is not added");
    }

    if (this.#originalImage === null) {
      throw Error("Image is not set");
    }
    var image = this.#originalImage;
    this.#appliedOperators.forEach((item) => {
      if (image) {
        image = item.compute(image);
        this.#processedImage = image;
      }
    });
  }

  /**
   * This function changes the attributes of the
   * Operator type
   * @param {String} blockType
   * @param {String} paramType
   * @param {String} value
   */
  changeValuesOfBlocks(blockType, paramType, value) {
    const block = this.#appliedOperators.find(
      (item) => item.type === blockType
    );
    if (block) {
      try {
        block.setParams(paramType, value);
      } catch (error) {
        throw error;
      }
    }
  }
}

module.exports = MainController;