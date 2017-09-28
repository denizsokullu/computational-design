from PIL import Image
import numpy as np
import json
import sys
import os
import string

def loadFont():
    path  = sys.argv[1]
    os.remove(path+"data.js")
    resFile = open(path+"data.js","w")
    resFile.write("font={")
    seenFirst = False
    for char in string.lowercase:
        curFile = path+char+".jpg"
        if os.path.exists(curFile):
            if not seenFirst:
                seenFirst = True
            elif seenFirst:
                resFile.write(",")
            resFile.write(loadLetter(curFile,char))
    resFile.write("}")
    resFile.close()
    return

def loadLetter(filename,char):
    print(filename)
    img = Image.open(filename)
    arr = np.array(img)
    locations = []
    y = 0
    for row in arr:
        x = 0;
        for col in row:
            threshold = 0
            if (col[0]<=threshold & col[1]<=threshold & col[2]<=threshold):
                locations.append([x,y])
            x += 1
        y += 1
    return ("\'"+char+"\':"+json.dumps(locations))

if __name__ == '__main__':
    loadFont()
