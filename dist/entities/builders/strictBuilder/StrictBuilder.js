"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StrictMixer_1 = __importDefault(require("./StrictMixer"));
const Picture_1 = __importDefault(require("../../graphics/Picture"));
const StrictMutator_1 = __importDefault(require("./StrictMutator"));
const StrictCrosser_1 = __importDefault(require("./StrictCrosser"));
const StrictCauldron_1 = __importDefault(require("./StrictCauldron"));
const JimpImage_1 = __importDefault(require("../../graphics/JimpImage"));
const StrictPopulator_1 = __importDefault(require("./StrictPopulator"));
const StrictEvaluator_1 = __importDefault(require("./StrictEvaluator"));
const SavingService_1 = __importDefault(require("../../../services/SavingService"));
const DrawingService_1 = __importDefault(require("../../../services/DrawingService"));
const StrictFitnessFunction_1 = __importDefault(require("./StrictFitnessFunction"));
const LoggerService_1 = __importDefault(require("../../../services/logger/LoggerService"));
class StrictBuilder {
    constructor() {
        this.crossoverChance = 0.8;
        this.mutationChance = 0.0001;
        this.nofMixes = 100;
    }
    createCauldron() {
        if (!this.picture || !this.picture._em || !this.picture._oi) {
            LoggerService_1.default.error("Picture has not been initialized yet or picture does not exists.");
            return;
        }
        if (!this.populationConfig) {
            LoggerService_1.default.error("Population config has not been created yet.");
            return;
        }
        this.cauldron = new StrictCauldron_1.default(this.populationConfig, new StrictPopulator_1.default(), this.picture._em, new StrictMixer_1.default(), new StrictEvaluator_1.default([{ weight: 1, fn: StrictFitnessFunction_1.default }]), new StrictMutator_1.default(), new StrictCrosser_1.default(), this.mutationChance, this.crossoverChance, this.nofMixes, new DrawingService_1.default(this.picture._oi), new SavingService_1.default());
    }
    setChances(crossoverChance, mutationChance) {
        if (crossoverChance !== null) {
            this.crossoverChance = crossoverChance;
        }
        if (mutationChance !== null) {
            this.mutationChance = mutationChance;
        }
    }
    setNumberOfMixes(numberOfMixes) {
        if (numberOfMixes) {
            this.nofMixes = numberOfMixes;
        }
    }
    setPopulationConfig(populationConfig) {
        this.populationConfig = populationConfig;
    }
    getBase64Image() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return "";
        }
        if (!this.outputImage) {
            LoggerService_1.default.error("Output image has not been initialized yet.");
            return "";
        }
        if (!this.outputImageConfig) {
            LoggerService_1.default.error("Output image config has not been initialized yet.");
            return "";
        }
        this.cauldron.draw(this.outputImage, this.outputImageConfig);
        return this.outputImage.toBase64();
    }
    saveImage(path) {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return;
        }
        if (!this.outputImage) {
            LoggerService_1.default.error("Output image has not been initialized yet.");
            return;
        }
        if (!this.outputImageConfig) {
            LoggerService_1.default.error("Output image config has not been initialized yet.");
            return;
        }
        this.cauldron.draw(this.outputImage, this.outputImageConfig);
        this.outputImage.writeImage(path);
    }
    saveProgress() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return;
        }
        this.cauldron.saveProgress();
    }
    loadProgress() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return;
        }
        this.cauldron.loadProgress();
    }
    startCauldron() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return;
        }
        this.cauldron.startMixing();
    }
    createPicture(imageUrl, useRawImage = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this.picture = new Picture_1.default(imageUrl, useRawImage);
            yield this.picture.waitForInit();
        });
    }
    setOutputImageConfig(outputImageConfig) {
        this.outputImageConfig = outputImageConfig;
    }
    createOutputImage() {
        if (!this.picture || !this.picture._em) {
            LoggerService_1.default.error("Picture has not been initialized yet or picture does not exists.");
            return;
        }
        if (!this.outputImageConfig) {
            LoggerService_1.default.error("There is no config for output image provided.");
            return;
        }
        this.outputImage = JimpImage_1.default.createFromMatrix(this.picture._em, this.outputImageConfig);
    }
    setOutputImage(outputImage) {
        this.outputImage = outputImage;
    }
}
exports.default = StrictBuilder;
//# sourceMappingURL=StrictBuilder.js.map