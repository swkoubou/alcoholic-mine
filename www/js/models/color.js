(function () {
    class Color {
        constructor(name, rgb) {
            this.name = name; // e.g., red, green, blue
            this.rgb = rgb; // #xxxxxx
        }
    }

    alcoholicmine.models.Color = Color;
}());