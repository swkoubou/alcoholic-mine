(function () {
    class Panel {
        constructor(color, isActive=true) {
            this.color = color;
            this.isActive = isActive;
        }
    }

    alcoholicmine.models.Panel = Panel;
}());