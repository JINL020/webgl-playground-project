class Direction {
    // Create new instances of the same class as static attributes
    static LEFT = new Direction("left")
    static RIGHT = new Direction("right")
    static UP = new Direction("up")
    static DOWN = new Direction("down")

    constructor(name) {
        this.name = name
    }
    static isOpposite(direction1, direction2) {
        if (direction1 == Direction.LEFT && direction2 == Direction.RIGHT || direction2 == Direction.LEFT && direction1 == Direction.RIGHT) {
            return true;
        }
        if (direction1 == Direction.UP && direction2 == Direction.DOWN || direction2 == Direction.UP && direction1 == Direction.DOWN) {
            return true;
        }
        return false;
    }

    static isSame(direction1, direction2) {
        if (direction1 == direction2) {
            return true;
        }
        return false;
    }

    static getTurnAngle(direction1, direction2) {
        if (Direction.isOpposite(direction1, direction2)) {
            return Math.PI;
        }
        else if (Direction.isSame(direction1, direction2)) {
            return 0;
        }
        else {
            switch (direction1) {
                case Direction.LEFT:
                    if (direction2 == Direction.UP) {
                        return -Math.PI / 2;
                    }
                    if (direction2 == Direction.DOWN) {
                        return Math.PI / 2;
                    }
                    break;
                case Direction.RIGHT:
                    if (direction2 == Direction.UP) {
                        return Math.PI / 2;
                    }
                    if (direction2 == Direction.DOWN) {
                        return -Math.PI / 2;
                    }
                    break;
                case Direction.UP:
                    if (direction2 == Direction.LEFT) {
                        return Math.PI / 2;
                    }
                    if (direction2 == Direction.RIGHT) {
                        return -Math.PI / 2;
                    }
                    break;
                case Direction.DOWN:
                    if (direction2 == Direction.LEFT) {
                        return -Math.PI / 2;
                    }
                    if (direction2 == Direction.RIGHT) {
                        return Math.PI / 2;
                    }
                    break;


            }
        }
    }
}