/**
 * Core colour algorithms for Exs Engine projects
 * @module ExsColourAlgorithm
 * @requires ExsConstantsColour
 * @requires ExsColourUtils
 * @author Exs Engine Development Team
 * @version 3.2.1
 * @license MIT
 */

import { ExsTransformation } from './ExsConstantsColour.js';
import ExsColourUtils from './ExsColourUtils.js';

export class ExsColourAlgorithm {
    static lerp(start, end, t) {
        return start + (end - start) * t;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static Easing = Object.freeze({
        linear: (t) => t,
        easeInQuad: (t) => t * t,
        easeOutQuad: (t) => t * (2 - t),
        easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: (t) => t * t * t,
        easeOutCubic: (t) => (--t) * t * t + 1,
        easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    });

    static ColourSpaceAlgorithm = class {
        static sRGBToLinear(value) {
            return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        }

        static rgbToXYZ(rgb) {
            const r = this.sRGBToLinear(rgb.r / 255);
            const g = this.sRGBToLinear(rgb.g / 255);
            const b = this.sRGBToLinear(rgb.b / 255);
            
            const matrix = ExsTransformation.MATRIX.RGB_TO_XYZ;
            
            const x = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
            const y = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
            const z = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
            
            return { x, y, z };
        }

        static rgbToLAB(rgb) {
            const xyz = this.rgbToXYZ(rgb);
            return this.xyzToLAB(xyz);
        }

        static xyzToLAB(xyz, whitePoint = { x: 0.95047, y: 1.00000, z: 1.08883 }) {
            const epsilon = 0.008856;
            const kappa = 903.3;
            
            const f = (t) => t > epsilon ? Math.cbrt(t) : (kappa * t + 16) / 116;
            
            const fx = f(xyz.x / whitePoint.x);
            const fy = f(xyz.y / whitePoint.y);
            const fz = f(xyz.z / whitePoint.z);
            
            const l = 116 * fy - 16;
            const a = 500 * (fx - fy);
            const b = 200 * (fy - fz);
            
            return { l, a, b };
        }

        static deltaE76(lab1, lab2) {
            const dl = lab1.l - lab2.l;
            const da = lab1.a - lab2.a;
            const db = lab1.b - lab2.b;
            return Math.sqrt(dl * dl + da * da + db * db);
        }

        static rgbToCMYK(rgb) {
            const r = rgb.r / 255;
            const g = rgb.g / 255;
            const b = rgb.b / 255;
            
            const k = 1 - Math.max(r, g, b);
            if (k === 1) return { c: 0, m: 0, y: 0, k: 1 };
            
            const c = (1 - r - k) / (1 - k);
            const m = (1 - g - k) / (1 - k);
            const y = (1 - b - k) / (1 - k);
            
            return {
                c: Math.round(c * 100),
                m: Math.round(m * 100),
                y: Math.round(y * 100),
                k: Math.round(k * 100)
            };
        }
    };

    static ColourQuantization = class {
        static medianCut(colours, maxColours) {
            if (colours.length <= maxColours) return colours;
            
            const boxes = [colours];
            
            while (boxes.length < maxColours) {
                let boxIndex = 0;
                let largestRange = -1;
                
                for (let i = 0; i < boxes.length; i++) {
                    const box = boxes[i];
                    const ranges = this.getColourRanges(box);
                    const range = Math.max(ranges.rRange, ranges.gRange, ranges.bRange);
                    if (range > largestRange) {
                        largestRange = range;
                        boxIndex = i;
                    }
                }
                
                const boxToSplit = boxes[boxIndex];
                const ranges = this.getColourRanges(boxToSplit);
                
                let channelToSort = 'r';
                if (ranges.gRange >= ranges.rRange && ranges.gRange >= ranges.bRange) channelToSort = 'g';
                else if (ranges.bRange >= ranges.rRange && ranges.bRange >= ranges.gRange) channelToSort = 'b';
                
                boxToSplit.sort((a, b) => a[channelToSort] - b[channelToSort]);
                const medianIndex = Math.floor(boxToSplit.length / 2);
                const leftBox = boxToSplit.slice(0, medianIndex);
                const rightBox = boxToSplit.slice(medianIndex);
                
                boxes.splice(boxIndex, 1, leftBox, rightBox);
            }
            
            return boxes.map(box => {
                const sum = box.reduce((acc, colour) => {
                    acc.r += colour.r;
                    acc.g += colour.g;
                    acc.b += colour.b;
                    return acc;
                }, { r: 0, g: 0, b: 0 });
                
                return {
                    r: Math.round(sum.r / box.length),
                    g: Math.round(sum.g / box.length),
                    b: Math.round(sum.b / box.length)
                };
            });
        }

        static getColourRanges(colours) {
            let rMin = 255, rMax = 0;
            let gMin = 255, gMax = 0;
            let bMin = 255, bMax = 0;
            
            for (const colour of colours) {
                rMin = Math.min(rMin, colour.r);
                rMax = Math.max(rMax, colour.r);
                gMin = Math.min(gMin, colour.g);
                gMax = Math.max(gMax, colour.g);
                bMin = Math.min(bMin, colour.b);
                bMax = Math.max(bMax, colour.b);
            }
            
            return { rRange: rMax - rMin, gRange: gMax - gMin, bRange: bMax - bMin };
        }
    };

    static extractPaletteFromImage(imageData, paletteSize, maxIterations = 10) {
        const pixels = [];
        const data = imageData.data;
        const step = Math.max(1, Math.floor(data.length / (paletteSize * 1000)));
        
        for (let i = 0; i < data.length; i += step * 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a > 128) pixels.push({ r, g, b });
        }
        
        if (pixels.length === 0) return [{ r: 0, g: 0, b: 0 }];
        
        const centroids = [];
        centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);
        
        for (let k = 1; k < paletteSize; k++) {
            const distances = pixels.map(pixel => {
                let minDistance = Infinity;
                for (const centroid of centroids) {
                    const dr = pixel.r - centroid.r;
                    const dg = pixel.g - centroid.g;
                    const db = pixel.b - centroid.b;
                    const distance = dr * dr + dg * dg + db * db;
                    minDistance = Math.min(minDistance, distance);
                }
                return minDistance;
            });
            
            const totalDistance = distances.reduce((sum, d) => sum + d, 0);
            let randomValue = Math.random() * totalDistance;
            
            for (let i = 0; i < pixels.length; i++) {
                randomValue -= distances[i];
                if (randomValue <= 0) {
                    centroids.push({ ...pixels[i] });
                    break;
                }
            }
        }
        
        for (let iteration = 0; iteration < maxIterations; iteration++) {
            const clusters = new Array(paletteSize).fill().map(() => []);
            const newCentroids = new Array(paletteSize).fill().map(() => ({ r: 0, g: 0, b: 0, count: 0 }));
            
            for (const pixel of pixels) {
                let minDistance = Infinity;
                let closestCentroid = 0;
                
                for (let i = 0; i < centroids.length; i++) {
                    const dr = pixel.r - centroids[i].r;
                    const dg = pixel.g - centroids[i].g;
                    const db = pixel.b - centroids[i].b;
                    const distance = dr * dr + dg * dg + db * db;
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCentroid = i;
                    }
                }
                
                clusters[closestCentroid].push(pixel);
                newCentroids[closestCentroid].r += pixel.r;
                newCentroids[closestCentroid].g += pixel.g;
                newCentroids[closestCentroid].b += pixel.b;
                newCentroids[closestCentroid].count++;
            }
            
            let converged = true;
            for (let i = 0; i < paletteSize; i++) {
                if (newCentroids[i].count > 0) {
                    const newR = Math.round(newCentroids[i].r / newCentroids[i].count);
                    const newG = Math.round(newCentroids[i].g / newCentroids[i].count);
                    const newB = Math.round(newCentroids[i].b / newCentroids[i].count);
                    
                    if (newR !== centroids[i].r || newG !== centroids[i].g || newB !== centroids[i].b) {
                        converged = false;
                    }
                    
                    centroids[i] = { r: newR, g: newG, b: newB };
                }
            }
            
            if (converged) break;
        }
        
        return centroids;
    }

    static calculateColourTemperature(rgb) {
        const xyz = this.ColourSpaceAlgorithm.rgbToXYZ(rgb);
        const sum = xyz.x + xyz.y + xyz.z;
        const x = xyz.x / sum;
        const y = xyz.y / sum;
        const n = (x - 0.3320) / (0.1858 - y);
        const cct = 437 * Math.pow(n, 3) + 3601 * Math.pow(n, 2) + 6861 * n + 5517;
        return Math.round(cct);
    }
}

export default ExsColourAlgorithm;
