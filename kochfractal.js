class KochFractal
{
    constructor(xPos, yPos, size)
    {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.points = [];

        this.points.push(createVector(xPos, yPos - Math.sqrt(3) / 3 * size));
        this.points.push(createVector(xPos - size / 2, yPos + Math.sqrt(3) / 6 * size));
        this.points.push(createVector(xPos + size / 2, yPos + Math.sqrt(3) / 6 * size));
    }

    nextIteration()
    {
        var newPoints = [];
        for(var i = 0; i < this.points.length - 1; i++)
        {
            this.populateInbetweenPoints(this.points[i], this.points[i + 1], newPoints);
        }
        this.populateInbetweenPoints(this.points[this.points.length - 1], this.points[0], newPoints);
        this.points = newPoints;
    }

    show(modifier)
    {
        for(var i = 1; i < this.points.length; i++)
        {
            strokeWeight(Math.abs(Math.sin(modifier) * 40));
            stroke(Math.abs(Math.sin(modifier) * 255), 255, 255);

            line(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y);
        }
        line(this.points[0].x, this.points[0].y, this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    }

    getVectorOfTrianglePoint(p1, p2)
    {
        var s60 = Math.sin(60 * Math.PI / 180.0);    
        var c60 = Math.cos(60 * Math.PI / 180.0);

        return createVector(c60 * (p1.x - p2.x) - s60 * (p1.y - p2.y) + p2.x,
                            s60 * (p1.x - p2.x) + c60 * (p1.y - p2.y) + p2.y);
    }

    populateInbetweenPoints(p1, p2, ptArray)
    {
        var oneThirdPt = createVector(p1.x * 2/3 + p2.x * 1/3, 
            p1.y * 2/3 + p2.y * 1/3);
        var twoThirdPt = createVector(p1.x * 1/3 + p2.x * 2/3, 
            p1.y * 1/3 + p2.y * 2/3);

        ptArray.push(createVector(p1.x, p1.y));
        ptArray.push(oneThirdPt);
        ptArray.push(this.getVectorOfTrianglePoint(twoThirdPt, oneThirdPt));
        ptArray.push(twoThirdPt);
        ptArray.push(createVector(p2.x, p2.y));
    }

    jitter()
    {
        for(var i = 0; i < this.points.length; i++)
        {
            this.points[i].x += (Math.random() - .5) * 5;
            this.points[i].y += (Math.random() - .5) * 5;
        }
    }
}