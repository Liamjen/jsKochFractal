var fractal;
var screenSize = 800;
var modifier = 0.03;
var jitterButton;
var nextIterButton;
var isJitter = false;

function setup()
{
    colorMode(HSB);
    background(0);
    
    jitterButton = createButton('jitter');
    jitterButton.mousePressed(toggleJitter);
    nextIterButton = createButton('next iteration');

    createCanvas(screenSize, screenSize);
    fractal = new KochFractal(screenSize / 2, screenSize / 2, screenSize * .8);

    nextIterButton.mousePressed(nextFractalIter);

    fractal.show();
}

function draw()
{
    background(0);    
    if(isJitter)
        fractal.jitter();
    
    fractal.show(modifier);
    modifier += 0.03;
}

function toggleJitter()
{
    isJitter = !isJitter;
}

function nextFractalIter()
{
    fractal.nextIteration();
}