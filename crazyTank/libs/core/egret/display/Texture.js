/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var egret;
(function (egret) {
    /**
     * @class egret.Texture
     * @classdesc 纹理类是对不同平台不同的图片资源的封装
     * 在HTML5中，资源是一个HTMLElement对象
     * 在OpenGL / WebGL中，资源是一个提交GPU后获取的纹理id
     * Texture类封装了这些底层实现的细节，开发者只需要关心接口即可
     * @link
        * http://docs.egret-labs.org/post/manual/bitmap/textures.html 纹理集的使用
     * http://docs.egret-labs.org/post/manual/loader/getres.html 获取资源的几种方式
     */
    var Texture = (function (_super) {
        __extends(Texture, _super);
        /**
         * 创建一个 egret.Texture 对象
         */
        function Texture() {
            _super.call(this);
            /**
             * 表示这个纹理在 bitmapData 上的 x 起始位置
             */
            this._bitmapX = 0;
            /**
             * 表示这个纹理在 bitmapData 上的 y 起始位置
             */
            this._bitmapY = 0;
            /**
             * 表示这个纹理在 bitmapData 上的宽度
             */
            this._bitmapWidth = 0;
            /**
             * 表示这个纹理在 bitmapData 上的高度
             */
            this._bitmapHeight = 0;
            /**
             * 表示这个纹理显示了之后在 x 方向的渲染偏移量
             */
            this._offsetX = 0;
            /**
             * 表示这个纹理显示了之后在 y 方向的渲染偏移量
             */
            this._offsetY = 0;
            /**
             * 纹理宽度
             */
            this._textureWidth = 0;
            /**
             * 纹理高度
             */
            this._textureHeight = 0;
            /**
             * 表示bitmapData.width
             */
            this._sourceWidth = 0;
            /**
             * 表示bitmapData.height
             */
            this._sourceHeight = 0;
            this._bitmapData = null;
        }
        var __egretProto__ = Texture.prototype;
        Object.defineProperty(__egretProto__, "textureWidth", {
            /**
             * 纹理宽度
             * @member {number} egret.Texture#textureWidth
             */
            get: function () {
                return this._textureWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "textureHeight", {
            /**
             * 纹理高度
             * @member {number} egret.Texture#textureHeight
             */
            get: function () {
                return this._textureHeight;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setBitmapData = function (value) {
            var scale = egret.MainContext.instance.rendererContext._texture_scale_factor;
            this._bitmapData = value;
            this._sourceWidth = value.width;
            this._sourceHeight = value.height;
            this._textureWidth = this._sourceWidth * scale;
            this._textureHeight = this._sourceHeight * scale;
            this._bitmapWidth = this._textureWidth;
            this._bitmapHeight = this._textureHeight;
            this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0;
        };
        /**
         * 获取某一点像素的颜色值
         * @method egret.Texture#getPixel32
         * @param x {number} 像素点的X轴坐标
         * @param y {number} 像素点的Y轴坐标
         * @returns {number} 指定像素点的颜色值
         */
        __egretProto__.getPixel32 = function (x, y) {
            var result = this._bitmapData.getContext("2d").getImageData(x, y, 1, 1);
            return result.data;
        };
        __egretProto__.dispose = function () {
            var bitmapData = this._bitmapData;
            if (bitmapData.dispose) {
                bitmapData.dispose();
            }
        };
        __egretProto__._clone = function () {
            var texture = new Texture();
            texture._bitmapData = this._bitmapData;
            return texture;
        };
        __egretProto__.draw = function (context, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, renderType) {
        };
        __egretProto__._drawForCanvas = function (context, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, renderType) {
            var bitmapData = this._bitmapData;
            if (!bitmapData["avaliable"]) {
                return;
            }
            if (renderType != undefined) {
                this._drawRepeatImageForCanvas(context, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, renderType);
            }
            else {
                context.drawImage(bitmapData, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }
        };
        __egretProto__._drawForNative = function (context, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, renderType) {
            var bitmapData = this._bitmapData;
            if (!bitmapData["avaliable"]) {
                return;
            }
            if (renderType !== undefined) {
                this._drawRepeatImageForNative(context, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, renderType);
            }
            else {
                context.drawImage(bitmapData, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }
        };
        __egretProto__._drawRepeatImageForNative = function (context, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
            var texture_scale_factor = egret.MainContext.instance.rendererContext._texture_scale_factor;
            sourceWidth = sourceWidth * texture_scale_factor;
            sourceHeight = sourceHeight * texture_scale_factor;
            for (var x = destX; x < destWidth; x += sourceWidth) {
                for (var y = destY; y < destHeight; y += sourceHeight) {
                    var destW = Math.min(sourceWidth, destWidth - x);
                    var destH = Math.min(sourceHeight, destHeight - y);
                    this._drawForNative(context, sourceX, sourceY, destW / texture_scale_factor, destH / texture_scale_factor, x, y, destW, destH, undefined);
                }
            }
        };
        __egretProto__._drawRepeatImageForCanvas = function (context, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
            if (this['pattern'] === undefined) {
                var texture_scale_factor = egret.MainContext.instance.rendererContext._texture_scale_factor;
                var image = this._bitmapData;
                var tempImage = image;
                if (image.width != sourceWidth || image.height != sourceHeight || texture_scale_factor != 1) {
                    var tempCanvas = document.createElement("canvas");
                    tempCanvas.width = sourceWidth * texture_scale_factor;
                    tempCanvas.height = sourceHeight * texture_scale_factor;
                    tempCanvas.getContext("2d").drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth * texture_scale_factor, sourceHeight * texture_scale_factor);
                    tempImage = tempCanvas;
                }
                var pat = context.createPattern(tempImage, repeat);
                this['pattern'] = pat;
            }
            var pattern = this['pattern'];
            context.fillStyle = pattern;
            context.translate(destX, destY);
            context.fillRect(0, 0, destWidth, destHeight);
            context.translate(-destX, -destY);
        };
        __egretProto__._disposeForCanvas = function () {
            Texture.deleteWebGLTexture(this);
            var bitmapData = this._bitmapData;
            bitmapData.onload = null;
            bitmapData.onerror = null;
            bitmapData.src = null;
            bitmapData["avaliable"] = false;
            console.log("_disposeForCanvas");
        };
        __egretProto__._disposeForNative = function () {
            var bitmapData = this._bitmapData;
            bitmapData.dispose();
            bitmapData["avaliable"] = false;
            console.log("_disposeForNative");
        };
        Texture.deleteWebGLTexture = function (texture) {
            var context = egret.MainContext.instance.rendererContext;
            var gl = context["gl"];
            var bitmapData = texture._bitmapData;
            if (bitmapData) {
                var webGLTexture = bitmapData.webGLTexture;
                if (webGLTexture && gl) {
                    for (var key in webGLTexture) {
                        var glTexture = webGLTexture[key];
                        gl.deleteTexture(glTexture);
                    }
                }
                bitmapData.webGLTexture = null;
            }
        };
        Texture.createBitmapData = function (url, callback) {
        };
        Texture._createBitmapDataForCanvasAndWebGl = function (url, callback) {
            var bitmapData = Texture._bitmapDataFactory[url];
            if (!bitmapData) {
                bitmapData = document.createElement("img");
                Texture._bitmapDataFactory[url] = bitmapData;
            }
            var winURL = window["URL"] || window["webkitURL"];
            if (winURL) {
                var xhr = new XMLHttpRequest();
                xhr.open("get", url, true);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    if (this.status == 200) {
                        var blob = this.response;
                        bitmapData.onload = function () {
                            winURL.revokeObjectURL(bitmapData.src); // 清除释放
                            bitmapData["avaliable"] = true;
                            callback(0, bitmapData);
                        };
                        bitmapData.onerror = function () {
                            callback(1, bitmapData);
                        };
                        bitmapData.src = winURL.createObjectURL(blob);
                    }
                };
                xhr.send();
            }
            else {
                bitmapData.onload = function () {
                    bitmapData["avaliable"] = true;
                    callback(0, bitmapData);
                };
                bitmapData.onerror = function () {
                    callback(1, bitmapData);
                };
                bitmapData.src = url;
            }
        };
        Texture._createBitmapDataForNative = function (url, callback) {
            console.log("_createBitmapDataForNative:" + url);
            var bitmapData = Texture._bitmapDataFactory[url];
            if (!bitmapData) {
                if (egret["NativeNetContext"].__use_asyn) {
                    var promise = new egret.PromiseObject();
                    promise.onSuccessFunc = function (bitmapData) {
                        Texture._bitmapDataFactory[url] = bitmapData;
                        bitmapData["avaliable"] = true;
                        callback(0, bitmapData);
                    };
                    promise.onErrorFunc = function () {
                        callback(1, null);
                    };
                    console.log("addTextureAsyn");
                    egret_native.Texture.addTextureAsyn(url, promise);
                }
                else {
                    console.log("addTexture");
                    bitmapData = egret_native.Texture.addTexture(url);
                    Texture._bitmapDataFactory[url] = bitmapData;
                    bitmapData["avaliable"] = true;
                    callback(0, bitmapData);
                }
            }
            else {
                console.log("reload");
                bitmapData.reload();
                bitmapData["avaliable"] = true;
                callback(0, bitmapData);
            }
        };
        Texture._bitmapDataFactory = {};
        return Texture;
    })(egret.HashObject);
    egret.Texture = Texture;
    Texture.prototype.__class__ = "egret.Texture";
})(egret || (egret = {}));
